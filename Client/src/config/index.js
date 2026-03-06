// Configuración centralizada de la aplicación
const {
  REACT_APP_API_BASE_URL,
  REACT_APP_API_TIMEOUT,
  NODE_ENV,
  REACT_APP_NAME,
  REACT_APP_VERSION
} = process.env

// Validar que todas las variables requeridas estén presentes
const requiredEnvVars = [
  'REACT_APP_API_BASE_URL',
  'REACT_APP_API_TIMEOUT',
  'NODE_ENV'
]

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar])

if (missingEnvVars.length > 0) {
  throw new Error(
    `❌ Faltan las siguientes variables de entorno: ${missingEnvVars.join(', ')}\n` +
    'Por favor, revisa tu archivo .env o configura las variables de entorno.'
  )
}

const config = {
  // API Configuration
  api: {
    baseURL: REACT_APP_API_BASE_URL,
    timeout: parseInt(REACT_APP_API_TIMEOUT),
  },
  
  // Environment
  environment: NODE_ENV,
  
  // App settings
  app: {
    name: REACT_APP_NAME || 'Rick and Morty App',
    version: REACT_APP_VERSION || '1.0.0',
  }
}

export default config
