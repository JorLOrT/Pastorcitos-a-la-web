# 🛠️ Comandos Útiles - Pastoral La Salle

## 📦 NPM - Gestión de Paquetes

### Instalar dependencias
```bash
npm install
```

### Agregar nueva dependencia
```bash
npm install nombre-paquete
```

### Agregar dependencia de desarrollo
```bash
npm install --save-dev nombre-paquete
```

### Desinstalar dependencia
```bash
npm uninstall nombre-paquete
```

### Actualizar dependencias
```bash
npm update
```

### Ver paquetes instalados
```bash
npm list --depth=0
```

## 🚀 Desarrollo

### Iniciar servidor de desarrollo
```bash
npm run dev
```
Abre: http://localhost:5173

### Construir para producción
```bash
npm run build
```
Genera carpeta `dist/`

### Vista previa del build
```bash
npm run preview
```

### Limpiar cache de npm
```bash
npm cache clean --force
```

## 🔧 Vite - Comandos Específicos

### Cambiar puerto del servidor
```bash
npm run dev -- --port 3000
```

### Exponer en red local
```bash
npm run dev -- --host
```

### Modo debug
```bash
npm run dev -- --debug
```

## 📝 Git - Control de Versiones

### Inicializar repositorio
```bash
git init
```

### Agregar archivos
```bash
git add .
```

### Commit
```bash
git commit -m "Descripción del cambio"
```

### Ver estado
```bash
git status
```

### Ver historial
```bash
git log --oneline
```

### Crear rama
```bash
git branch nombre-rama
```

### Cambiar de rama
```bash
git checkout nombre-rama
```

### Crear y cambiar a rama
```bash
git checkout -b nombre-rama
```

## 🌐 Deploy - Despliegue

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Agregar en package.json:
# "homepage": "https://tuusuario.github.io/nombre-repo",
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"
npm run deploy
```

## 🐛 Debugging

### Ver errores en consola
Abre DevTools (F12) → Console

### Inspeccionar componentes React
Instala React Developer Tools en tu navegador

### Limpiar localStorage
En DevTools → Application → Local Storage → Clear

## 📊 Análisis de Bundle

### Analizar tamaño del build
```bash
npm install --save-dev rollup-plugin-visualizer
```

Agrega en `vite.config.js`:
```javascript
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react(), visualizer()]
})
```

## 🧪 Testing (Opcional)

### Instalar Vitest
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

### Instalar React Testing Library
```bash
npm install --save-dev @testing-library/react @testing-library/user-event
```

## 🎨 Formateo de Código

### Instalar Prettier
```bash
npm install --save-dev prettier
```

### Formatear código
```bash
npx prettier --write .
```

### Instalar ESLint
```bash
npm install --save-dev eslint
npx eslint --init
```

## 📱 PWA - Progressive Web App

### Instalar plugin de PWA
```bash
npm install --save-dev vite-plugin-pwa
```

## 🔄 Actualizar React

### Actualizar a última versión
```bash
npm install react@latest react-dom@latest
```

## 📋 Scripts Personalizados

Puedes agregar en `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx",
    "format": "prettier --write \"src/**/*.{js,jsx,css}\"",
    "clean": "rm -rf dist node_modules",
    "reinstall": "npm run clean && npm install"
  }
}
```

## 🆘 Solución de Problemas Comunes

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Puerto 5173 ocupado
```bash
npm run dev -- --port 3000
```

### Error: Build falla
```bash
npm run build -- --debug
```

### Limpiar todo y reinstalar
```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules, dist
npm install

# Linux/Mac
rm -rf node_modules dist
npm install
```

## 📚 Recursos Útiles

- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- React Router: https://reactrouter.com
- CSS Modules: https://github.com/css-modules/css-modules

## 💡 Tips

1. Usa `npm run dev` para desarrollo
2. Revisa la consola del navegador para errores
3. Instala React DevTools para debugging
4. Usa ESLint y Prettier para código limpio
5. Commitea frecuentemente con Git

---

**¡Feliz desarrollo! 🎉**
