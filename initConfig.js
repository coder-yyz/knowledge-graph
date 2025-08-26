import fs from 'fs'
import path from 'path'

const sidebar = []

const initSidebar = (dirPath, sidebar) => {
  const files = fs.readdirSync(dirPath)
  files.forEach(file => {
    if (file === '.vitepress') return // 忽略.vitepress目录
    const fullPath = path.join(dirPath, file)
    const stats = fs.statSync(fullPath)
    if (stats.isDirectory()) { // 如果是目录，递归处理
      const dirSidebar = {
        text: file,
        items: []
      }
      initSidebar(fullPath, dirSidebar.items)
      sidebar.push(dirSidebar)
    } else if (stats.isFile() && file.endsWith('.md')) { // 如果是文件，添加到侧边栏
      const fileName = file.replace('.md', '')
      // 转为相对路径
      const relativePath = path.relative(path.resolve(__dirname, './docs'), fullPath).replace(/\\/g, '/')
      sidebar.push({ text: fileName, link: `/${relativePath}` })
    }
  })
  return sidebar
}

initSidebar(path.resolve(__dirname, './docs'), sidebar)
console.log(JSON.stringify(sidebar))


export default {
  title: "yyz's knowledge graph",
  description: "yyz's knowledge graph",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/coder-yyz/knowledge-graph' }
    ]
  },
  cleanUrls: true,
  base: '/knowledge-graph/',
}