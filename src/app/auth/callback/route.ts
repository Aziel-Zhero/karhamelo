
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
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
        return NextResponse.redirect(`${origin}/auth/auth-code-error`)
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Redirecionar para uma página de erro se o código não for trocado com sucesso
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
