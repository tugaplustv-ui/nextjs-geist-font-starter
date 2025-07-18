# PrimeTuga React Native App

Uma aplicação móvel para assistir filmes e séries com conteúdo do PrimeTuga, inspirada no design do HBO Max.

## 🎬 Funcionalidades

- **Interface Moderna**: Design inspirado no HBO Max com tema escuro
- **Web Scraping**: Extrai conteúdo automaticamente do primetuga.blogspot.com
- **Navegação Intuitiva**: Bottom tabs para fácil navegação
- **Busca Avançada**: Pesquisa por título, gênero e descrição
- **Player de Vídeo**: Reprodução de vídeos com controles personalizados
- **Downloads**: Gerenciamento de conteúdo baixado
- **Perfil**: Configurações e preferências do usuário

## 🚀 Tecnologias Utilizadas

- **React Native 0.80.1**
- **React Navigation 7.x**
- **Axios** para requisições HTTP
- **Cheerio** para web scraping
- **React Native Video** para reprodução de mídia
- **React Native Reanimated** para animações

## 📱 Telas

1. **Home**: Conteúdo em destaque e categorias
2. **Busca**: Pesquisa e filtros por categoria
3. **Downloads**: Gerenciamento de conteúdo offline
4. **Perfil**: Configurações e informações do usuário
5. **Detalhes**: Informações completas do filme/série
6. **Player**: Reprodução de vídeos

## 🎨 Design System

### Cores (baseadas no PrimeTuga)
- **Primary**: #E50914 (Vermelho PrimeTuga)
- **Background**: #0F0F0F (Preto HBO Max)
- **Cards**: #1A1A1A
- **Text**: #FFFFFF

### Tipografia
- Sistema de fontes moderno com hierarquia clara
- Tamanhos responsivos para diferentes dispositivos

## 📦 Instalação

### Pré-requisitos
- Node.js 16+
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS)

### Passos

1. **Clone o repositório**
```bash
git clone <repository-url>
cd PrimeTugaApp
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o ambiente React Native**
```bash
# Para Android
npx react-native run-android

# Para iOS
npx react-native run-ios
```

## 🔧 Configuração

### Web Scraping
O app faz scraping do `primetuga.blogspot.com`. Para melhor performance:

1. **Cache**: Dados são armazenados em cache por 30 minutos
2. **Fallback**: Em caso de erro, dados de exemplo são exibidos
3. **Retry**: Sistema de retry automático para requisições

### Vídeos
- URLs de vídeo são extraídas durante o scraping
- Player suporta formatos MP4, M3U8
- Controles personalizados com tema escuro

## 📁 Estrutura do Projeto

```
PrimeTugaApp/
├── src/
│   ├── components/
│   │   ├── common/          # Componentes reutilizáveis
│   │   ├── home/           # Componentes da home
│   │   └── player/         # Player de vídeo
│   ├── screens/            # Telas da aplicação
│   ├── navigation/         # Configuração de navegação
│   ├── services/           # Web scraping e APIs
│   ├── styles/             # Sistema de design
│   └── utils/              # Constantes e utilitários
├── App.js                  # Componente principal
└── package.json
```

## 🎯 Funcionalidades Principais

### Home Screen
- Banner em destaque com conteúdo principal
- Seções horizontais por categoria
- Pull-to-refresh para atualizar conteúdo
- Loading states e error handling

### Search Screen
- Busca em tempo real
- Filtros por categoria
- Grid responsivo de resultados
- Estado vazio personalizado

### Details Screen
- Informações completas do conteúdo
- Botões de ação (Assistir, Download, Lista)
- Design imersivo com imagem de fundo
- Metadados organizados

### Video Player
- Controles personalizados
- Progress bar
- Fullscreen support
- Error handling

## 🔍 Web Scraping

### Estratégia
1. **Fetch HTML** do PrimeTuga usando Axios
2. **Parse** com Cheerio para extrair dados
3. **Cache** para melhor performance
4. **Fallback** para dados de exemplo

### Dados Extraídos
- Título do filme/série
- Imagem/poster
- Descrição/sinopse
- Ano de lançamento
- Gênero
- URLs de vídeo

## 🎨 Customização

### Cores
Edite `src/styles/colors.js` para personalizar o tema:

```javascript
export default {
  primary: '#E50914',    // Cor principal
  background: '#0F0F0F', // Fundo
  // ... outras cores
};
```

### Tipografia
Modifique `src/styles/typography.js` para ajustar fontes:

```javascript
export default {
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    // ... outras propriedades
  },
};
```

## 🚀 Deploy

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
```bash
npx react-native run-ios --configuration Release
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Metro bundler não inicia**
```bash
npx react-native start --reset-cache
```

2. **Erro de dependências**
```bash
rm -rf node_modules
npm install
```

3. **Problemas de build Android**
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para suporte técnico ou dúvidas:
- Email: suporte@primetuga.com
- Issues: GitHub Issues

---

**Desenvolvido com ❤️ para os amantes de cinema e séries**
