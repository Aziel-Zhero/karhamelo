'use server';

import { createClient } from '@/lib/supabase/server';
import type { Link, PageData, Profile, PageTheme, Portfolio } from './types';

// Combines all data loading into one function to reduce round trips
export async function loadPageData(userId: string): Promise<PageData | null> {
    const supabase = createClient();

    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('name, avatar_url')
        .eq('id', userId)
        .single();
    
    if (userError && userError.code !== 'PGRST116') { // Ignore "No rows found" error
        console.error('Error fetching user:', userError.message);
        return null;
    }

    const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('profile_bio, social_links, theme, portfolio')
        .eq('user_id', userId)
        .single();
    
     if (pageError && pageError.code !== 'PGRST116') {
        console.error('Error fetching page data:', pageError.message);
        return null;
    }

    const { data: linksData, error: linksError } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', userId)
        .order('order', { ascending: true });

    if (linksError) {
        console.error('Error fetching links:', linksError.message);
        return null;
    }

    const profile: Profile = {
        name: userData?.name || '',
        avatarUrl: userData?.avatar_url || '',
        bio: pageData?.profile_bio || '',
        isPortfolioLinkEnabled: (pageData?.portfolio as Portfolio)?.isCtaBannerEnabled ?? true,
        socialLinks: (pageData?.social_links as Profile['socialLinks']) || {},
    };

    const links: Link[] = linksData || [];
    const theme: PageTheme = (pageData?.theme as PageTheme) || {
      primaryColor: 'hsl(199 76% 52%)',
      backgroundColor: 'hsl(216 28% 95%)',
      accentColor: 'hsl(207 88% 68%)',
      backgroundPattern: 'none',
      buttonStyle: 'filled',
      buttonRadius: 'full',
      buttonShadow: true,
    };
    
    const portfolio: Portfolio = (pageData?.portfolio as Portfolio) || {
        logoType: 'text',
        logoText: 'Karhamelo',
        title: 'Venda tudo em um só lugar',
        description: 'Lance seu marketplace com checkout rápido, gestão de sellers, vitrine moderna e integração simples.',
        imageUrl: 'https://picsum.photos/1200/800',
        ctaButtonText: 'Criar minha conta',
        ctaButtonUrl: '#contact',
        isFeaturesEnabled: true,
        features: [
          { title: 'Mostre seu Trabalho', description: 'Convide, aprove e gerencie lojistas com comissões, estoque e contratos.' },
          { title: 'Checkout Ultra-rápido', description: 'Pix, cartão e boleto com antifraude e split de pagamento automático.' },
          { title: 'Catálogo Inteligente', description: 'Variações, kits, SEO automático e vitrines personalizáveis por seller.' },
        ],
        isHowItWorksEnabled: true,
        howItWorksTitle: 'Comece em 3 passos',
        howItWorksDescription: 'Um fluxo simples para tirar sua ideia do papel rapidamente.',
        steps: [
          { title: 'Crie sua Conta', description: 'Personalize sua marca e detalhes.' },
          { title: 'Adicione seu Conteúdo', description: 'Faça upload de projetos, links e informações.' },
          { title: 'Publique e Divulgue', description: 'Compartilhe sua nova página com o mundo.' },
        ],
        howItWorksImageUrl: 'https://picsum.photos/seed/workflow/1200/1000',
        isGalleryEnabled: true,
        galleryTitle: 'Conheça nossos projetos',
        galleryDescription: 'Veja alguns dos marketplaces incríveis que nossos clientes criaram com a Karhamelo.',
        projects: [
          { id: 'proj1', title: 'Marketplace de Arte Local', imageUrl: 'https://picsum.photos/seed/proj1/800/600' },
          { id: 'proj2', title: 'Loja de Produtos Orgânicos', imageUrl: 'https://picsum.photos/seed/proj2/800/600' },
          { id: 'proj3', title: 'Plataforma de Cursos Online', imageUrl: 'https://picsum.photos/seed/proj3/800/600' },
          { id: 'proj4', title: 'Brechó de Luxo Colaborativo', imageUrl: 'https://picsum.photos/seed/proj4/800/600' },
        ],
        isCtaBannerEnabled: true,
        ctaBannerTitle: 'Pronto para criar seu espaço?',
        ctaBannerDescription: 'Crie sua conta em menos de 2 minutos e comece a divulgar.',
        ctaBannerButtonText: 'Começar agora',
    };


    return { profile, links, theme, portfolio };
}


export async function savePageData(userId: string, data: PageData) {
    const supabase = createClient();
    const { profile, links, theme, portfolio } = data;

    // 1. Update user's name and avatar in the 'users' table
    const { error: userError } = await supabase
        .from('users')
        .update({
            name: profile.name,
            avatar_url: profile.avatarUrl,
            updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

    if (userError) {
        console.error('Error updating user:', userError);
        throw new Error('Failed to update user profile.');
    }

    // 2. Upsert page data (bio, social links, theme, portfolio)
    const { error: pageError } = await supabase
        .from('pages')
        .upsert({
            user_id: userId,
            profile_bio: profile.bio,
            social_links: profile.socialLinks as any,
            theme: theme as any,
            portfolio: portfolio as any,
            updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

    if (pageError) {
        console.error('Error saving page data:', pageError);
        throw new Error('Failed to save page settings.');
    }

    // 3. Handle links: delete all existing and insert the new list
    // This is simpler than diffing for this prototype
    const { error: deleteError } = await supabase
        .from('links')
        .delete()
        .eq('user_id', userId);

    if (deleteError) {
        console.error('Error deleting old links:', deleteError);
        throw new Error('Failed to update links.');
    }

    if (links && links.length > 0) {
        const linksToInsert = links.map((link, index) => ({
            ...link,
            user_id: userId,
            order: index,
        }));
        const { error: insertError } = await supabase
            .from('links')
            .insert(linksToInsert);

        if (insertError) {
            console.error('Error inserting new links:', insertError);
            throw new Error('Failed to save new links.');
        }
    }

    return { success: true };
}

export async function incrementLinkClick(linkId: string) {
    const supabase = createClient();
    const { error } = await supabase.rpc('increment_click_count', { link_id_param: linkId });
    if (error) {
        console.error("Failed to increment link click", error);
    }
}
