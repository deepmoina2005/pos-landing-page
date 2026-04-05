import { ShoppingCart, Menu, X, ChevronDown, Download, LogOut, User, Monitor, Smartphone } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { Button } from '../../../components/ui/button'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { ThemeToggle } from '../../../components/theme-toggle'
import { logout } from '../../../Redux Toolkit/features/user/userThunks'
import { clearUserState } from '../../../Redux Toolkit/features/user/userSlice'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(null)
    const [profileOpen, setProfileOpen] = useState(false)
    const profileRef = useRef(null)

    const { userProfile } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close profile dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = () => {
        dispatch(logout())
        dispatch(clearUserState())
        setProfileOpen(false)
        navigate('/')
    }

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name)
    }

    const handleAppDownload = () => {
        const link = document.createElement('a')
        link.href = '/downloads/pos.exe'
        link.setAttribute('download', 'pos.exe')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    // Get initials for avatar
    const getInitials = (name) => {
        if (!name) return 'U'
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm border-b' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => navigate('/')}>
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                                <ShoppingCart className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">POS Pro</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <button onClick={() => navigate('/')} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors py-2">Home</button>
                        <button onClick={() => navigate('/pricing')} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors py-2">Pricing</button>
                        <button onClick={() => navigate('/about')} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors py-2">About Us</button>
                        <button onClick={() => navigate('/solution')} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors py-2">Solution</button>
                        <button onClick={() => navigate('/mobile')} className="flex items-center gap-1.5 text-muted-foreground cursor-pointer hover:text-primary transition-colors py-2"><Smartphone className="w-4 h-4" />Mobile App</button>
                        <button onClick={() => navigate('/desktop')} className="flex items-center gap-1.5 text-muted-foreground cursor-pointer hover:text-primary transition-colors py-2"><Monitor className="w-4 h-4" />Desktop App</button>
                    </nav>

                    {/* Right Side: CTA or Profile */}
                    <div className="hidden md:flex items-center space-x-3">
                        <ThemeToggle />

                        {userProfile ? (
                            /* ── Logged-in: show user profile avatar ── */
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 border border-border/60 bg-card/80 hover:bg-accent transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    {/* Avatar circle */}
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-sm">
                                        {getInitials(userProfile.fullName || userProfile.name)}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-foreground leading-none">
                                            {userProfile.fullName || userProfile.name || 'User'}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground mt-0.5 capitalize leading-none">
                                            {userProfile.role?.replace(/_/g, ' ').toLowerCase()}
                                        </p>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Profile Dropdown */}
                                {profileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-popover rounded-xl shadow-xl border border-border py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                        {/* User info */}
                                        <div className="px-4 py-3 border-b border-border">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                                                    {getInitials(userProfile.fullName || userProfile.name)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-foreground">
                                                        {userProfile.fullName || userProfile.name || 'User'}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground truncate max-w-[130px]">
                                                        {userProfile.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Role badge */}
                                        <div className="px-4 py-2 border-b border-border">
                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-2.5 py-1">
                                                <User className="w-3 h-3" />
                                                {userProfile.role?.replace(/_/g, ' ')}
                                            </span>
                                        </div>

                                        {/* Logout */}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* ── Not logged in: show Download + Sign In ── */
                            <>
                                <Button
                                    variant="outline"
                                    className="font-medium"
                                    onClick={() => navigate('/auth/login')}
                                >
                                    Sign In
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle />
                        {userProfile && (
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                                {getInitials(userProfile.fullName || userProfile.name)}
                            </div>
                        )}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-muted-foreground hover:text-primary p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border bg-background">
                        <nav className="flex flex-col">
                            <button onClick={() => { navigate('/'); setIsMenuOpen(false); }} className="w-full text-left px-4 py-4 text-muted-foreground hover:text-primary border-b border-border">Home</button>
                            <button onClick={() => { navigate('/pricing'); setIsMenuOpen(false); }} className="w-full text-left px-4 py-4 text-muted-foreground hover:text-primary border-b border-border">Pricing</button>
                            <button onClick={() => { navigate('/about'); setIsMenuOpen(false); }} className="w-full text-left px-4 py-4 text-muted-foreground hover:text-primary border-b border-border">About Us</button>
                            <button onClick={() => { navigate('/solution'); setIsMenuOpen(false); }} className="w-full text-left px-4 py-4 text-muted-foreground hover:text-primary border-b border-border">Solution</button>
                            <button onClick={() => { navigate('/mobile'); setIsMenuOpen(false); }} className="flex items-center gap-2 px-4 py-4 text-muted-foreground hover:text-primary border-b border-border"><Smartphone className="w-4 h-4" />Mobile App</button>
                            <button onClick={() => { navigate('/desktop'); setIsMenuOpen(false); }} className="flex items-center gap-2 px-4 py-4 text-muted-foreground hover:text-primary border-b border-border"><Monitor className="w-4 h-4" />Desktop App</button>

                            {/* Mobile: Profile or Auth buttons */}
                            <div className="flex flex-col space-y-3 p-4">
                                {userProfile ? (
                                    <>
                                        {/* Profile info */}
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                                                {getInitials(userProfile.fullName || userProfile.name)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">
                                                    {userProfile.fullName || userProfile.name || 'User'}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {userProfile.email}
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="destructive"
                                            className="w-full"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign Out
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={() => navigate('/auth/login')} variant="outline" className="w-full">
                                            Sign In
                                        </Button>
                                        <Button onClick={handleAppDownload} className="w-full">
                                            Download App
                                            <Download className="w-4 h-4 ml-2" />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
