export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'strojevi',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/auth-next',
  ],

  tailwindcss: {
    cssPath: '~/style/style.css',
    configPath: 'tailwind.config.js',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'data.token',
          global: true,
        },
        user: {
          property: 'data',
          autoFetch: true
        },
        endpoints: {
          login: { url: 'http://localhost:3333/login', method: 'post', propertyName: 'data.token' },
          user: { url: 'http://localhost:3333/user', method: 'get' },
          logout: { url: 'http://localhost:3333/logout', method: 'post' },
        },
      }
    }
  },

  toast: {
    position: 'top-right',
    duration: 2000
  }
}
