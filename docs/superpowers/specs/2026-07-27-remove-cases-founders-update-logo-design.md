# Remoção de cases e fundadores e atualização da marca

## Objetivo

Aplicar somente as alterações solicitadas no site atual da Macken, preservando estrutura, textos, estilos, animações e comportamento que não estejam diretamente relacionados ao escopo.

## Alterações

- Remover a seção de cases/portfólio da página.
- Remover links e chamadas que levem para a seção de cases/portfólio.
- Remover a seção com Fabio e Felipe, incluindo nomes, cargos, fotos e texto sobre os fundadores.
- Substituir a marca visual existente pela imagem `m_V2.png` fornecida pelo cliente:
  - logo da navegação;
  - logo do rodapé;
  - favicon;
  - qualquer outra ocorrência da marca principal do site.

## Preservação

- Manter a ordem das demais seções.
- Manter os textos restantes sem reescrita.
- Manter o idioma atual.
- Manter cores, tipografia, espaçamentos, animações e responsividade, salvo ajustes mínimos necessários para acomodar a nova logo ou remover lacunas deixadas pelas seções excluídas.
- Não criar novas seções, serviços, CTAs ou conteúdo.

## Limpeza técnica

- Remover imports e referências que ficarem sem uso após a retirada das seções.
- Manter arquivos de cases, imagens e vídeos existentes no repositório, pois o pedido é retirar sua exibição do site, não apagar os materiais.
- Manter as fotos dos fundadores no repositório, retirando apenas sua exibição.

## Verificação

- Executar lint e build.
- Confirmar que não existem links visíveis para `#portfolio`.
- Confirmar que Fabio e Felipe não aparecem na página principal.
- Confirmar visualmente a nova logo na navegação e no rodapé e o favicon no documento.
- Verificar o resultado em desktop e mobile.
