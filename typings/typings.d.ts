declare module 'ythp' {
    namespace ythp {
        interface videoYTHP {
            recommended: VideoItem[]
            ads: VideoItem[]
            misc: VideoItem[]
        }

        interface VideoItem {
            id: string
            title: string
            description: string
            duration: string
            view_count: string
            short_view_count_text: string
            isLive: boolean
            thumbnails: {
                height: number
                url: string
                width: number
            }[]
            author: {
                name: string
                channel_url: string
                avatar: {
                    height: number
                    url: string
                    width: number
                }[]
            }
        }

        interface commandMetadata {
            webCommandMetadata: {
                url: string
                webPageType?: string
                rootVe?: number
                sendPost?: boolean
                apiUrl?: string
            }
        }
        
        interface navigationEndpoint {
            clickTrackingParams: string
            commandMetadata: commandMetadata
            loggingUrls?: loggingUrls[]
            browseEndpoint?: {
                browseId: string
                canonicalBaseUrl: string
            }
            watchEndpoint?: {
                videoId: string
            }
            searchEndpoint?: {
                query: string
            }
            signInEndpoint?: {
                idamTag: number
            }
            feedbackEndpoint?: {
                feedbackToken: string
                uiActions: {
                    hideEnclosingContainer: boolean
                }
                actions: {
                    clickTrackingParams: string
                    replaceEnclosingAction: {
                        item: {
                            notificationTextRenderer: {
                                successResponseText: {
                                    accessibility: accessibility
                                    simpleText: string
                                }
                                trackingParams: string
                            }
                        }
                    }
                }[]
            }
        }
        
        interface loggingUrls {
            baseUrl: string
        }
        
        interface viewableCommands {
            clickTrackingParams: string
            loggingUrls: loggingUrls[]
            pingingEndpoint: {
                hack: boolean
            }
        }
        
        interface signalServiceEndpoint {
            signal: string
            actions: {
                clickTrackingParams: string
                addToPlaylistCommand: {
                    openMiniplayer: true,
                    videoId: string
                    listType: string
                    onCreateListCommand: {
                        clickTrackingParams: string
                        commandMetadata: commandMetadata
                        createPlaylistServiceEndpoint: {
                            videoIds: string[]
                            params: string
                        }
                    },
                    videoIds: string[]
                }
            }[]
        }
        
        interface menu {
            menuRenderer: {
                items:
                {
                    menuServiceItemRenderer: {
                        text: {
                            runs: {
                                text: string
                            }[]
                        }
                        icon: {
                            iconType: string
                        }
                        serviceEndpoint: {
                            clickTrackingParams: string
                            commandMetadata: commandMetadata
                            signalServiceEndpoint: signalServiceEndpoint
                        },
                        trackingParams: string
                    }
                }[]
                trackingParams: string
                accessibility: {
                    accessibilityData: {
                        label: string
                    }
                },
                targetId: string
            }
        }
        
        interface thumbnail {
            thumbnails: {
                url: string
                width: number
                height: number
            }[]
            accessibility?: accessibility
        }
        
        interface thumbnailOverlays {
            thumbnailOverlayTimeStatusRenderer: thumbnailOverlayTimeStatusRenderer[]
            thumbnailOverlayToggleButtonRenderer: thumbnailOverlayToggleButtonRenderer[]
            thumbnailOverlayNowPlayingRenderer: thumbnailOverlayNowPlayingRenderer[]
        }
        
        interface thumbnailOverlayTimeStatusRenderer {
            text: {
                accessibility: {
                    accessibilityData: {
                        label: string
                    }
                },
                simpleTex: string
            },
            style: string
        }
        
        interface playlistEditEndpoint {
            playlistId: string
            actions: {
                addedVideoId: string
                action: string
            }[]
        }
        
        interface toggledAccessibility {
            accessibilityData: {
                label: string
            }
        }
        
        interface toggledServiceEndpoint {
            clickTrackingParams: string
            commandMetadata: commandMetadata
            playlistEditEndpoint: playlistEditEndpoint
        }
        
        interface toggledIcon {
            iconType: string
        }
        
        interface thumbnailOverlayToggleButtonRenderer {
            isToggled: boolean
            untoggledIcon: toggledIcon
            toggledIcon: toggledIcon
            untoggledTooltip: string
            toggledTooltip: string
            untoggledServiceEndpoint: toggledServiceEndpoint
            toggledServiceEndpoint: toggledServiceEndpoint
            untoggledAccessibility: toggledAccessibility
            toggledAccessibility: toggledAccessibility
            trackingParams: string
        }
        
        interface thumbnailOverlayNowPlayingRenderer {
            text: {
                runs: [
                    {
                        text: string
                    }
                ]
            }
        }
        
        interface runs {
            text: string
            navigationEndpoint?: navigationEndpoint
        }
        
        interface accessibility {
            accessibilityData: {
                label: string
            }
        }
        
        interface buttonRenderer {
            style: string | { styleType: string }
            size: string
            icon: toggledIcon
            iconPosition?: string
            accessibility: {
                label: string
            }
            text?: {
                runs: runs[]
            }
            tooltip: string
            trackingParams: string
            serviceEndpoint?: navigationEndpoint
            feedbackEndpoint?: navigationEndpoint
            isToggled?: boolean
            isDisabled?: boolean
            defaultIcon?: toggledIcon
            toggledIcon?: toggledIcon
            toggledStyle?: toggledIcon
            navigationEndpoint?: navigationEndpoint
            accessibilityData?: accessibility
            targetId?: string
            command?: {
                clickTrackingParams: string
                commandMetadata: commandMetadata
                signalServiceEndpoint: {
                    signal: string
                    actions: {
                        clickTrackingParams: string
                        signalAction: {
                            signal: string
                        }
                    }[]
                }
            }
        }
        
        interface multiPageMenuSectionRenderer {
            items: compactLinkRenderer[]
            trackingParams: string
        }
        
        interface compactLinkRenderer {
            icon: toggledIcon
            title: {
                runs: runs[]
            }
            navigationEndpoint: navigationEndpoint
            trackingParams: string
        }
        
        interface topbarMenuButtonRenderer {
            icon: toggledIcon
            menuRenderer?: {
                multiPageMenuRenderer: {
                    sections: multiPageMenuSectionRenderer[]
                    trackingParams: string
                }
            }
            menuRequest?: {
                clickTrackingParams: string
                commandMetadata: commandMetadata
                signalServiceEndpoint: {
                    signal: string
                    actions: {
                        clickTrackingParams: string
                        openPopupAction: {
                            popup: {
                                multiPageMenuRenderer: {
                                    trackingParams: string
                                    style: string
                                    showLoadingSpinner: boolean
                                }
                            },
                            popupType: string
                            beReused: boolean
                        }
                    }[]
                }
            }
            trackingParams: string
            accessibility: accessibility
            tooltip: string
            style: string
            targetId: string
        }
        
        interface hotkeyDialogSectionOptionRenderer {
            label: {
                runs: runs[]
            }
            hotkey: string
            hotkeyAccessibilityLabel?: accessibility
        }
        
        interface hotkeyDialogSectionRenderer {
            title: {
                runs: runs[]
            },
            options: hotkeyDialogSectionOptionRenderer[]
        }
        
        interface contentsrichSectionRenderer {
            richSectionRenderer: {
                content: {
                    richShelfRenderer?: {
                        title: {
                            runs: runs[]
                        }
                        contents: contentsrichItemRenderer[]
                        trackingParams: string
                        endpoint: navigationEndpoint
                        showMoreButton: {
                            buttonRenderer: buttonRenderer
                        }
                    }
                    compactPromotedItemRenderer?: {
                        thumbnail: thumbnail
                        title: {
                            runs: runs[]
                        }
                        subtitle: {
                            runs: runs[]
                        }
                        actionButton: {
                            buttonRenderer: buttonRenderer
                        }
                        trackingParams: string
                        dismissButton: {
                            buttonRenderer: buttonRenderer
                        }
                        badge: badges
                        style: string
                        impressionEndpoints: navigationEndpoint[]
                    }
                }
                trackingParams: string
            }
        }
        
        interface contentsrichItemRenderer {
            richItemRenderer: {
                content: {
                    videoRenderer: {
                        videoId: string
                        thumbnail: {
                            height: number
                            url: string
                            width: number
                        }[]
                        title: {
                            runs: runs[]
                            accessibility: accessibility
                        }
                        descriptionSnippet: {
                            runs: runs[]
                        }
                        longBylineText: {
                            runs: runs[]
                        }
                        publishedTimeText: {
                            simpleText: string
                        }
                        upcomingEventData: {
                            startTime: string,
                            isReminderSet: boolean,
                            upcomingEventText: { runs: runs[] }
                        } | false | any
                        lengthText: {
                            accessibility: accessibility
                            simpleText: string
                        } | {
                            accessibility: null
                            simpleText: ''
                        }
                        viewCountText: {
                            simpleText: string
                        }
                        navigationEndpoint: navigationEndpoint
                        ownerBadges?: {
                            metadataBadgeRenderer: {
                                icon: toggledIcon
                                style: string
                                tooltip: string
                                trackingParams: string
                            }
                        }[]
                        ownerText: {
                            runs: runs[]
                        }
                        shortBylineText: {
                            runs: runs[]
                        }
                        trackingParams: string
                        showActionMenu: boolean
                        shortViewCountText: {
                            simpleText: string
                        }
                        menu: menu
                        channelThumbnailSupportedRenderers: {
                            channelThumbnailWithLinkRenderer: {
                                thumbnail: {
                                    height: number
                                    url: string
                                    width: number
                                }[]
                                navigationEndpoint: navigationEndpoint
                                accessibility: accessibility
                            }
                        }
                        thumbnailOverlays: thumbnailOverlays[]
                    }
                }
                trackingParams: string
            }
        }
        
        interface contentscontinuationItemRenderer {
            continuationItemRenderer: {
                trigger: string
                continuationEndpoint: {
                    clickTrackingParams: string
                    commandMetadata: commandMetadata
                    continuationCommand: {
                        token: string
                        request: string
                    }
                }
            }
        }
        
        interface reportingPing {
            pingType: string
            url: string
        }
        
        interface badges {
            metadataBadgeRenderer: {
                style: string
                label: string
                trackingParams: string
            }
        }
        
        interface masthead {
            videoMastheadAdV3Renderer: {
                trackingParams: string
                primaryVideo: {
                    videoMastheadAdPrimaryVideoRenderer: {
                        trackingParams: string
                        videoId: string
                        isWidescreen: boolean
                        playbackStartMs: number
                        muteButton: {
                            toggleButtonRenderer: buttonRenderer
                        }
                        navigationEndpoint: navigationEndpoint
                        clickthroughReportingData: {
                            reportingPings: reportingPing[]
                        }
                        playbackDurationMs: number
                        playerParams: string
                    }
                },
                advertiserInfo: {
                    videoMastheadAdAdvertiserInfoRenderer: {
                        trackingParams: string
                        title: {
                            simpleText: string
                        }
                        byline: {
                            runs: runs[]
                        }
                        channelThumbnail: thumbnail
                        badges: badges[]
                        channelEndpoint: navigationEndpoint
                        menu: menu
                    }
                }
                primaryVideoOverlay: {
                    videoMastheadAdPrimaryVideoOverlayRenderer: {
                        trackingParams: string
                        title: {
                            simpleText: string
                        }
                        byline: {
                            runs: runs[]
                        }
                        badges: badges[]
                        menu: menu
                    }
                }
                impressionCommand: {
                    clickTrackingParams: string
                    loggingUrls: loggingUrls[]
                }
                activeView: {
                    viewableCommands: viewableCommands[]
                    endOfSessionCommands: viewableCommands[]
                    regexUriMacroValidator: {
                        emptyMap: boolean
                    }
                }
                showAdRenderer: {
                    buttonRenderer: buttonRenderer
                }
            }
        }
        
        interface logo {
            topbarLogoRenderer: {
                iconImage: toggledIcon
                tooltipText: {
                    runs: runs[]
                }
                endpoint: navigationEndpoint
                trackingParams: string
            }
        }
        
        interface searchbox {
            fusionSearchboxRenderer: {
                icon: toggledIcon
                placeholderText: {
                    runs: runs[]
                }
                config: {
                    webSearchboxConfig: {
                        requestLanguage: string
                        requestDomain: string
                        hasOnscreenKeyboard: boolean
                        focusSearchbox: boolean
                    }
                }
                trackingParams: string
                searchEndpoint: navigationEndpoint
            }
        }
        
        interface windowInitial {
            responseContext: {
                serviceTrackingParams: {
                    service: string
                    params: {
                        key: string
                        value: string
                    }[]
                }[]
                maxAgeSeconds: number
                webResponseContextExtensionData: {
                    ytConfigData: {
                        csn: string
                        visitorData: string
                        rootVisualElementType: number
                    },
                    hasDecorated: boolean
                }
            }
            contents: {
                twoColumnBrowseResultsRenderer: {
                    tabs: {
                        tabRenderer: {
                            selected: true,
                            content: {
                                richGridRenderer: {
                                    contents: (contentsrichItemRenderer | contentsrichSectionRenderer | contentscontinuationItemRenderer)[]
                                    trackingParams: string
                                    targetId: string
                                    masthead: masthead
                                }
                            }
                            tabIdentifier: string
                            trackingParams: string
                        }
                    }[]
                }
            }
            header: {
                feedTabbedHeaderRenderer: {
                    title: {
                        runs: runs[]
                    }
                }
            }
            trackingParams?: string
            topbar?: {
                desktopTopbarRenderer: {
                    logo: logo
                    searchbox: searchbox
                    trackingParams: string
                    countryCode: string
                    topbarButtons: (buttonRenderer | topbarMenuButtonRenderer)[]
                    hotkeyDialog: {
                        hotkeyDialogRenderer: {
                            title: {
                                runs: runs[]
                            }
                            sections: hotkeyDialogSectionRenderer[]
                            dismissButton: {
                                buttonRenderer: buttonRenderer
                            }
                            trackingParams: string
                        }
                    }
                    backButton: {
                        buttonRenderer: buttonRenderer
                    },
                    forwardButton: buttonRenderer
                    a11ySkipNavigationButton: {
                        buttonRenderer: buttonRenderer
                    }
                }
            }
        }

        const YTHOMEPAGE: string;
        const BEGIN: string;
        const END: string;

        function initalHTML(): Promise<string>;
        function initialData(): Promise<Object>;
        function reconfigWindow(window: windowInitial): videoYTHP;
        function between(haystack: string): string;
    }
    function ythp(): Promise<videoYTHP>;
    export = ythp;
}