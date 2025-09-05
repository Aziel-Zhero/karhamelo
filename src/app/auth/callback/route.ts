
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // Use a URL base do seu site, ou uma URL relativa para o dashboard.
  // Para funcionar tanto em localhost quanto em produção, vamos construir a URL final.
  const baseUrl = origin.includes('localhost') ? 'http://localhost:9002' : 'https://karhamelo.netlify.app';
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = createClient()
    const { error, data: { user } } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && user) {
      // Após o login, vamos garantir que o usuário exista na nossa tabela 'users'
      const { error: upsertError } = await supabase
        .from('users')
        .upsert({
          id: user.id, // Chave primária
          google_id: user.user_metadata.provider_id,
          email: user.email,
          name: user.user_metadata.full_name,
          avatar_url: user.user_metadata.avatar_url,
          updated_at: new Date().toISOString(),
        })

      if (upsertError) {
        console.error('Supabase upsert error:', upsertError)
        // Redirecionar para uma página de erro se não conseguir salvar o usuário
        return NextResponse.redirect(`${baseUrl}/auth/auth-code-error`)
      }
      
      // Redireciona para o dashboard na URL base correta
      return NextResponse.redirect(`${baseUrl}${next}`)
    }
  }

  // Redirecionar para uma página de erro se o código não for trocado com sucesso
  return NextResponse.redirect(`${baseUrl}/auth/auth-code-error`)
}
