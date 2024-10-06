import Sidebar from "../classes/Sidebar"

export default function initSidebar() {
  const $sidebarElement = document.querySelector('[data-sidebar="sidebar"]')

  if (!$sidebarElement) {
    return
  }

  const sidebar = new Sidebar($sidebarElement)
  sidebar.init()
}
