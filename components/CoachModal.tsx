'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, HelpCircle } from 'lucide-react'

interface CoachModalProps {
    isOpen: boolean
    onClose: () => void
    hints: string[]
}

export default function CoachModal({ isOpen, onClose, hints }: CoachModalProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <HelpCircle className="w-6 h-6 text-ftc-blue" />
                                        <Dialog.Title className="text-lg font-semibold text-gray-900">
                                            Coach Mode
                                        </Dialog.Title>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <p className="text-sm text-gray-600 mb-4">
                                    These questions can help guide your thinking. We won't give you the answer—you need to figure it out!
                                </p>

                                <ul className="space-y-3">
                                    {hints.map((hint, idx) => (
                                        <li key={idx} className="flex items-start space-x-2">
                                            <span className="text-ftc-orange font-semibold flex-shrink-0">•</span>
                                            <span className="text-gray-700">{hint}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={onClose}
                                    className="mt-6 w-full bg-ftc-blue hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                                >
                                    Got It
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
