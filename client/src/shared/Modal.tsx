import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
    useContext,
    createContext,
} from 'react'

import PropTypes from 'prop-types'

const ModalContext = createContext<any>({})

function Modal({ modal, i }: any) {
    const { setModals, states } = useContext<any>(ModalContext)
    const [isTransformMinimize, setIsTransformMinimize] = useState(false)
    const { key, hookKey } = modal

    const prevModalStateRef = useRef(null)
    const modalState = useMemo(() => {
        if (states[hookKey] !== prevModalStateRef.current) {
            prevModalStateRef.current = states[hookKey]
        }
        return states[hookKey]
    }, [states, hookKey])

    const handleMaximizeModal = () => {
        setIsTransformMinimize(false)
    }

    const handleTransitionEnd = (e: any) => {
        if (Array.from(e.target.classList).includes('modal-minimize')) {
            setIsTransformMinimize(true)
            return
        }
    }

    const closeModal = (key: any) => (e: any) => {
        e.stopPropagation()
        setModals((prev: any) => prev.filter((modal: any) => modal.key !== key))
    }

    useEffect(() => {
        if (!isTransformMinimize) {
            setModals((prev: any) =>
                prev.map((modal: any) =>
                    modal.key === key ? { ...modal, status: 'open' } : modal
                )
            )
        }
    }, [isTransformMinimize, key, setModals])

    return (
        <>
            <div
                className={`border-l border-t border-r border-white mr-1 px-2 py-1 bg-primary-700
                    cursor-pointer rounded-tl-lg rounded-tr-lg flex items-center ${
                        isTransformMinimize ? '' : 'invisible'
                    }`}
                onClick={handleMaximizeModal}
            >
                <p className="whitespace-nowrap text-sm text-white">
                    {modal.title}
                </p>
                <button
                    className="ml-2 cursor-pointer"
                    onClick={closeModal(modal.key)}
                >
                    <i className="fa fa-times text-white text-sm" />
                </button>
            </div>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 modal-new transition-all duration-100 ease-linear ${
                    modal?.status === 'open'
                        ? ''
                        : 'modal-minimize cursor-pointer'
                } ${isTransformMinimize ? 'hidden' : ''}`}
                style={{
                    zIndex: 9999,
                    right: modal.status === 'minimize' ? `${i * 78}px` : '0',
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                <div onClick={(e) => e.stopPropagation()}>
                    {typeof modal?.content === 'function'
                        ? modal?.content(modalState)
                        : modal?.content}
                </div>
                {modal.status === 'minimize' && (
                    <div className="absolute w-full h-full" />
                )}
            </div>
        </>
    )
}

Modal.defaultProps = {
    modal: {
        hookKey: '',
        title: '',
    },
}

Modal.propTypes = {
    modal: PropTypes.shape({
        title: PropTypes.string,
        status: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        hookKey: PropTypes.string,
        content: PropTypes.instanceOf(Object).isRequired,
    }),
    i: PropTypes.number.isRequired,
}

export function ModalProvider({ children }: any) {
    const [modals, setModals] = useState([])
    const [states, setStates] = useState({})

    return (
        <ModalContext.Provider value={{ setModals, modals, setStates, states }}>
            <div className="fixed bottom-0 right-0 max-w-full flex flex-row-reverse z-[100] overflow-x-scroll">
                {modals.map((modal: any, i) => (
                    <React.Fragment key={modal.key}>
                        <Modal modal={modal} i={i} />
                    </React.Fragment>
                ))}
            </div>
            {children}
        </ModalContext.Provider>
    )
}

ModalProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
}

export function ModalCard({ title, children, onMinimize, onClose, size }: any) {
    const showHeader = useMemo(
        () => title || onClose || onMinimize,
        [title, onClose, onMinimize]
    )
    return (
        <div className={`modal-card ${size}`} style={{ height: 'max-content' }}>
            {showHeader && (
                <header className="bg-white px-5 py-5 flex border-b rounded-t-lg">
                    {title && (
                        <h2 className="text-black font-medium text-xl">
                            {title}
                        </h2>
                    )}
                    <div className="ml-auto flex">
                        {onMinimize && (
                            <button onClick={onMinimize}>
                                <i className="far fa-window-minimize text-black" />
                            </button>
                        )}
                        {onClose && (
                            <button className="ml-4" onClick={onClose}>
                                <i className="fa fa-times text-black" />
                            </button>
                        )}
                    </div>
                </header>
            )}
            {children}
        </div>
    )
}

ModalCard.defaultProps = {
    title: '',
    size: 'md',
    onClose: null,
    onMinimize: null,
}

ModalCard.propTypes = {
    title: PropTypes.string,
    onMinimize: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.instanceOf(Object),
    ]),
    onClose: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.instanceOf(Object),
    ]),
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
}

export const useCreateModal = (key = 'modal', state = {}) => {
    const { setModals, setStates } = useContext<any>(ModalContext)
    const prevStateRef = useRef<any>(null)

    useEffect(() => {
        if (JSON.stringify(prevStateRef.current) === JSON.stringify(state))
            return
        prevStateRef.current = state
        setStates((prev: any) => ({ ...prev, [key]: state }))
    }, [state, setStates, key])

    const createModal = useCallback(
        ({ title = 'Title', content = (arg1: any, arg2: any) => null }) => {
            const modalKey = `${key}-${Date.now()}`
            const minimizeModal = () =>
                setModals((prev: any) =>
                    prev.map((modal: any) => {
                        return modal.key === modalKey
                            ? {
                                  ...modal,
                                  status: 'minimize',
                              }
                            : modal
                    })
                )

            const closeThisModal = (): any => {
                setModals((prev: any) =>
                    prev.filter((modal: any) => modal.key !== modalKey)
                )
            }
            setModals((prev: any) => [
                ...prev,
                {
                    key: modalKey,
                    hookKey: key,
                    title,
                    status: 'open',
                    content: content(closeThisModal, minimizeModal),
                },
            ])
        },
        [key, setModals]
    )
    return createModal
}

export const useDestroyModal = () => {
    const { setModals, setStates } = useContext<any>(ModalContext)

    const destroyModal = useCallback(() => {
        setModals([])
        setStates({})
    }, [setModals, setStates])

    return destroyModal
}

export const useModal = (
    configs = {
        key: 'default',
        title: 'Modal',
    }
) => {
    const { setModals } = useContext<any>(ModalContext)
    const title = configs.title || 'Modal'

    const modal = (content = (arg1: any, arg2: any) => null) => {
        const key = `${configs.key || 'default'}-${Date.now()}`
        const minimizeModal = () =>
            setModals((prev: any) =>
                prev.map((modal: any) => {
                    return modal.key === key
                        ? {
                              ...modal,
                              status: 'minimize',
                          }
                        : modal
                })
            )

        const closeModal = () => {
            setModals((prev: any) =>
                prev.filter((modal: any) => modal.key !== key)
            )
        }
        setModals((prev: any) => [
            ...prev,
            {
                key,
                title,
                status: 'open',
                content: content(closeModal, minimizeModal),
            },
        ])
    }
    return modal
}
