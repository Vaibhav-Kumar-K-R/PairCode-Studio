import ChatsView from "@/components/sidebar/sidebar-views/ChatsView"
import CopilotView from "@/components/sidebar/sidebar-views/CopilotView"
import FilesView from "@/components/sidebar/sidebar-views/FilesView"
import RunView from "@/components/sidebar/sidebar-views/RunView"
import SettingsView from "@/components/sidebar/sidebar-views/SettingsView"
import UsersView from "@/components/sidebar/sidebar-views/UsersView"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { VIEWS, ViewContext as ViewContextType } from "@/types/view"
import { ReactNode, createContext, useContext, useState } from "react"


const ViewContext = createContext<ViewContextType | null>(null)

export const useViews = (): ViewContextType => {
    const context = useContext(ViewContext)
    if (!context) {
        throw new Error("useViews must be used within a ViewContextProvider")
    }
    return context
}

function ViewContextProvider({ children }: { children: ReactNode }) {
    const { isMobile } = useWindowDimensions()
    const [activeView, setActiveView] = useState<VIEWS>(VIEWS.FILES)
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(!isMobile)
    const [viewComponents] = useState({
        [VIEWS.FILES]: <FilesView />,
        [VIEWS.CLIENTS]: <UsersView />,
        [VIEWS.SETTINGS]: <SettingsView />,
        [VIEWS.COPILOT]: <CopilotView />,
        [VIEWS.CHATS]: <ChatsView />,
        [VIEWS.RUN]: <RunView />,
    })
    const [viewIcons] = useState({
        [VIEWS.FILES]: <i className="codicon codicon-files text-lg"></i>,
        [VIEWS.CLIENTS]: <i className="codicon codicon-account text-lg"></i>,
        [VIEWS.SETTINGS]: <i className="codicon codicon-settings-gear text-lg"></i>,
        [VIEWS.CHATS]: <i className="codicon codicon-comment-discussion text-lg"></i>,
        [VIEWS.COPILOT]: <i className="codicon  codicon-copilot-large"></i>,
        [VIEWS.RUN]:<i className="codicon codicon-play text-lg"></i>,
    })

    return (
        <ViewContext.Provider
            value={{
                activeView,
                setActiveView,
                isSidebarOpen,
                setIsSidebarOpen,
                viewComponents,
                viewIcons,
            }}
        >
            {children}
        </ViewContext.Provider>
    )
}

export { ViewContextProvider }
export default ViewContext
