'use client';

import { useEffect } from 'react';
import { Button, Text } from '@grupo10-pos-fiap/design-system';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error Boundary capturou um erro crítico:', error);
    
  }, [error]);

  return (
    <html lang="pt-BR">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
          <div className="max-w-md w-full text-center space-y-4">
            <Text as="h1" variant="h1" weight="bold" className="text-red-600">
              Erro Crítico
            </Text>
            
            <Text variant="body" className="text-gray-600">
              Ocorreu um erro crítico na aplicação. Por favor, recarregue a página
              ou entre em contato com o suporte.
            </Text>

            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-4 bg-gray-100 rounded text-left">
                <Text variant="caption" className="font-mono text-xs">
                  {error.message}
                </Text>
                {error.digest && (
                  <Text variant="caption" className="font-mono text-xs mt-2">
                    Digest: {error.digest}
                  </Text>
                )}
              </div>
            )}

            <div className="mt-6 space-x-4">
              <Button
                onClick={() => reset()}
                variant="primary"
                aria-label="Tentar novamente"
              >
                Tentar novamente
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outlined"
                aria-label="Recarregar página"
              >
                Recarregar página
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

