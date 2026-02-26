import { useState, useRef, useEffect } from 'react';
import './MackenSound.css';

// SVG Icons for professional look
const Icons = {
    Music: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
    ),
    Home: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
    ),
    Search: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
    ),
    Library: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
        </svg>
    ),
    Clock: () => (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
    ),
    Heart: ({ filled }) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
    ),
    Speaker: () => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
    ),
    Play: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
        </svg>
    ),
    Pause: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
    ),
    Prev: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
        </svg>
    ),
    Next: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
        </svg>
    )
};

const MackenSound = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [toastMessage, setToastMessage] = useState('');
    const [isDraggingProgress, setIsDraggingProgress] = useState(false);
    const [isDraggingVolume, setIsDraggingVolume] = useState(false);

    // View History & Navigation
    const [viewHistory, setViewHistory] = useState([{ view: 'home', playlist: null }]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    // Derived state for current view
    const currentView = viewHistory[historyIndex].view;
    const activePlaylist = viewHistory[historyIndex].playlist;

    const [nowPlaying, setNowPlaying] = useState({
        title: 'Midnight Serenade',
        artist: 'Miles Davis Quintet',
        img: '/images/lofi_cafe.png',
        audioSrc: '/audio/track1.mp3',
        playlist: null,
        index: 0
    });
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const handleInteraction = (action) => {
        setToastMessage(`Action: ${action}`);
        setTimeout(() => setToastMessage(''), 2500);
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        const current = audioRef.current.currentTime;
        const total = audioRef.current.duration;
        setCurrentTime(current);
        setProgress((current / total) * 100);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleProgressChange = (e) => {
        if (!audioRef.current || duration === 0) return;
        const rect = e.currentTarget.getBoundingClientRect();
        let clickX = e.clientX - rect.left;
        if (clickX < 0) clickX = 0;
        if (clickX > rect.width) clickX = rect.width;

        const newTime = (clickX / rect.width) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
        setProgress((newTime / duration) * 100);
    };

    const handleVolumeChange = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        let clickX = e.clientX - rect.left;
        let newVolume = clickX / rect.width;
        if (newVolume < 0) newVolume = 0;
        if (newVolume > 1) newVolume = 1;
        setVolume(newVolume);
    };

    const handleProgressPointerDown = (e) => {
        setIsDraggingProgress(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        handleProgressChange(e);
    };

    const handleProgressPointerMove = (e) => {
        if (isDraggingProgress) {
            handleProgressChange(e);
        }
    };

    const handleProgressPointerUp = (e) => {
        setIsDraggingProgress(false);
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    const handleVolumePointerDown = (e) => {
        setIsDraggingVolume(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        handleVolumeChange(e);
    };

    const handleVolumePointerMove = (e) => {
        if (isDraggingVolume) {
            handleVolumeChange(e);
        }
    };

    const handleVolumePointerUp = (e) => {
        setIsDraggingVolume(false);
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    const jazzClassics = [
        { title: "Midnight Serenade", artist: "Miles Davis Quintet", album: "Kind of Blue", duration: "3:42", file: "/audio/track.mp3" },
        { title: "Autumn Leaves", artist: "Chet Baker", album: "In Paris", duration: "2:15", file: "/audio/track1.mp3" },
        { title: "Take Five", artist: "Dave Brubeck", album: "Time Out", duration: "4:05", file: "/audio/track2.mp3" },
        { title: "My Favorite Things", artist: "John Coltrane", album: "Coltrane Jazz", duration: "2:50", file: "/audio/track3.mp3" },
        { title: "Blue Train", artist: "John Coltrane", album: "Blue Train", duration: "5:12", file: "/audio/track4.mp3" }
    ];

    const modernJazz = [
        { title: "Lingus", artist: "Snarky Puppy", album: "We Like It Here", duration: "6:30", file: "/audio/track5.mp3" },
        { title: "The Epic", artist: "Kamasi Washington", album: "The Epic", duration: "4:45", file: "/audio/track6.mp3" },
        { title: "Gotta Dance", artist: "Hiromi", album: "Spark", duration: "3:50", file: "/audio/track7.mp3" },
        { title: "Valerie", artist: "Amy Winehouse", album: "Back to Black", duration: "3:15", file: "/audio/track8.mp3" },
        { title: "Liquid Spirit", artist: "Gregory Porter", album: "Liquid Spirit", duration: "4:20", file: "/audio/track9.mp3" }
    ];

    const playlists = [
        { name: "Classic Jazz Lounge", color: "#855827", img: "/images/lofi_cafe.png", tracks: jazzClassics },
        { name: "Modern Jazz Fusion", color: "#6a2785", img: "/images/synthwave_beats.png", tracks: modernJazz }
    ];

    const allTracks = [...jazzClassics, ...modernJazz];
    const searchResults = searchQuery ? allTracks.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.artist.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const navigateTo = (view, playlist = null) => {
        const newHistory = viewHistory.slice(0, historyIndex + 1);
        newHistory.push({ view, playlist });
        setViewHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const goBack = () => {
        if (historyIndex > 0) setHistoryIndex(historyIndex - 1);
    };

    const goForward = () => {
        if (historyIndex < viewHistory.length - 1) setHistoryIndex(historyIndex + 1);
    };

    const openPlaylist = (p) => {
        navigateTo('playlist', p);
        handleInteraction(`Abrir Playlist: ${p.name}`);
    };

    const playTrack = (track, playlistImg, trackList = null, index = 0) => {
        setNowPlaying({
            title: track.title,
            artist: track.artist,
            img: playlistImg,
            audioSrc: track.file,
            playlist: trackList,
            index: index
        });

        // Timeout to allow React to update the audio tag src before playing
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(err => console.log("Auto-play prevented", err));
            }
        }, 50);

        handleInteraction(`Tocar: ${track.title}`);
    };

    const skipTrack = (direction) => {
        if (!nowPlaying.playlist) return;
        let newIndex = nowPlaying.index + direction;
        if (newIndex >= nowPlaying.playlist.length) newIndex = 0;
        if (newIndex < 0) newIndex = nowPlaying.playlist.length - 1;

        const nextTrack = nowPlaying.playlist[newIndex];
        playTrack(nextTrack, nowPlaying.img, nowPlaying.playlist, newIndex);
    };

    return (
        <div className="mackensound">
            {toastMessage && (
                <div className="ms-toast animate-toast">
                    {toastMessage}
                </div>
            )}

            <aside className="ms-sidebar">
                <div className="ms-brand" onClick={() => handleInteraction('MackenSound Home')} style={{ cursor: 'pointer' }}>
                    <span className="ms-logo-icon"><Icons.Music /></span>
                    <h2>MackenSound</h2>
                </div>
                <nav className="ms-nav">
                    <a href="#" className={currentView === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>
                        <Icons.Home /> Home
                    </a>
                    <a href="#" className={currentView === 'search' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigateTo('search'); }}>
                        <Icons.Search /> Search
                    </a>
                    <a href="#" className={currentView === 'library' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigateTo('library'); }}>
                        <Icons.Library /> Your Library
                    </a>
                </nav>
                <div className="ms-playlists">
                    <p className="ms-label">PLAYLISTS</p>
                    {playlists.map((p, i) => <a href="#" key={i} onClick={(e) => { e.preventDefault(); openPlaylist(p); }}>{p.name}</a>)}
                </div>
            </aside>

            <main className="ms-main">
                <header className="ms-header">
                    <div className="ms-nav-arrows">
                        <button className="ms-circle-btn" onClick={goBack} disabled={historyIndex === 0} style={{ opacity: historyIndex === 0 ? 0.5 : 1 }}>&lt;</button>
                        <button className="ms-circle-btn" onClick={goForward} disabled={historyIndex === viewHistory.length - 1} style={{ opacity: historyIndex === viewHistory.length - 1 ? 0.5 : 1 }}>&gt;</button>
                    </div>
                    <div className="ms-user" onClick={() => handleInteraction('Abrir Perfil de Usuário')}>
                        <span className="ms-avatar">F</span>
                        Felipe Latchuk
                    </div>
                </header>

                <div className="ms-content">
                    {currentView === 'home' ? (
                        <>
                            <h1>Good afternoon</h1>
                            <div className="ms-grid">
                                {playlists.map((p, i) => (
                                    <div className="ms-card-h" key={i} onClick={() => openPlaylist(p)}>
                                        <div className="ms-card-img" style={{
                                            backgroundImage: `url(${p.img})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundColor: p.color
                                        }}></div>
                                        <span>{p.name}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : currentView === 'search' ? (
                        <div style={{ padding: '2rem' }}>
                            <h1>Search</h1>
                            <input type="text" placeholder="What do you want to listen to?"
                                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%', maxWidth: '400px', padding: '1rem',
                                    borderRadius: '50px', border: 'none', marginTop: '1rem',
                                    background: '#242424', color: 'white', fontSize: '1rem'
                                }} />

                            {searchQuery && (
                                <div className="ms-track-list" style={{ marginTop: '2rem' }}>
                                    {searchResults.length > 0 ? searchResults.map((track, i) => (
                                        <div className="ms-track-row" key={i} onClick={() => playTrack(track, '/images/synthwave_beats.png', searchResults, i)}>
                                            <div className="ms-track-title-col" style={{ gridColumn: '1 / 3' }}>
                                                <span className="ms-track-name" style={{ color: nowPlaying.title === track.title ? 'var(--ms-accent)' : 'white' }}>{track.title}</span>
                                                <span className="ms-track-artist">{track.artist}</span>
                                            </div>
                                            <span className="ms-track-album" style={{ gridColumn: '3 / 4' }}>{track.album}</span>
                                            <span className="ms-track-duration" style={{ gridColumn: '4 / 5' }}>{track.duration}</span>
                                        </div>
                                    )) : <p style={{ color: 'var(--ms-text-subdued)' }}>No results found for "{searchQuery}"</p>}
                                </div>
                            )}
                        </div>
                    ) : currentView === 'library' ? (
                        <div style={{ padding: '2rem' }}>
                            <h1>Your Library</h1>
                            <p style={{ color: 'var(--ms-text-subdued)', marginTop: '1rem' }}>
                                Your saved playlists, albums, and podcasts will appear here.
                            </p>
                        </div>
                    ) : activePlaylist && (
                        <div className="ms-playlist-view">
                            <div className="ms-playlist-header">
                                <div className="ms-playlist-cover" style={{
                                    backgroundImage: `url(${activePlaylist.img})`,
                                    backgroundSize: 'cover',
                                    backgroundColor: activePlaylist.color
                                }}></div>
                                <div className="ms-playlist-info">
                                    <p className="ms-label">PLAYLIST</p>
                                    <h1 style={{ fontSize: '4rem', margin: '0.5rem 0' }}>{activePlaylist.name}</h1>
                                    <p style={{ color: 'var(--ms-text-subdued)' }}>{activePlaylist.tracks.length} songs, about 1 hr 15 min</p>
                                    <div style={{ marginTop: '1rem' }}>
                                        <button className="ms-btn-play ms-play-large" onClick={() => playTrack(activePlaylist.tracks[0], activePlaylist.img, activePlaylist.tracks, 0)} style={{ width: '56px', height: '56px', fontSize: '1.5rem', background: 'var(--ms-accent)' }}><Icons.Play /></button>
                                    </div>
                                </div>
                            </div>

                            <div className="ms-track-list">
                                <div className="ms-track-header">
                                    <span>#</span>
                                    <span>Title</span>
                                    <span>Album</span>
                                    <span><Icons.Clock /></span>
                                </div>
                                {activePlaylist.tracks.map((track, i) => (
                                    <div className="ms-track-row" key={i} onClick={() => playTrack(track, activePlaylist.img, activePlaylist.tracks, i)}>
                                        <span className="ms-track-num">{i + 1}</span>
                                        <div className="ms-track-title-col">
                                            <span className="ms-track-name" style={{ color: nowPlaying.title === track.title ? 'var(--ms-accent)' : 'white' }}>{track.title}</span>
                                            <span className="ms-track-artist">{track.artist}</span>
                                        </div>
                                        <span className="ms-track-album">{track.album}</span>
                                        <span className="ms-track-duration">{track.duration}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <footer className="ms-player">
                {/* O player agora lê o arquivo da faixa atual dinamicamente */}
                <audio
                    ref={audioRef}
                    src={nowPlaying.audioSrc}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => skipTrack(1)}
                />

                <div className="ms-now-playing">
                    <div className="ms-cover-art" style={{
                        backgroundImage: `url(${nowPlaying.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}></div>
                    <div className="ms-track-info">
                        <h4>{nowPlaying.title}</h4>
                        <p>{nowPlaying.artist}</p>
                    </div>
                    <button className="ms-like" onClick={() => handleInteraction('Música favoritada!')}>
                        <Icons.Heart />
                    </button>
                </div>

                <div className="ms-controls">
                    <div className="ms-buttons">
                        <button className="ms-btn-small" onClick={() => skipTrack(-1)}><Icons.Prev /></button>
                        <button className="ms-btn-play" onClick={togglePlay}>
                            {isPlaying ? <Icons.Pause /> : <Icons.Play />}
                        </button>
                        <button className="ms-btn-small" onClick={() => skipTrack(1)}><Icons.Next /></button>
                    </div>
                    <div className="ms-progress-bar">
                        <span>{formatTime(currentTime)}</span>
                        <div className="ms-slider"
                            onPointerDown={handleProgressPointerDown}
                            onPointerMove={handleProgressPointerMove}
                            onPointerUp={handleProgressPointerUp}>
                            <div className="ms-slider-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="ms-volume">
                    <Icons.Speaker />
                    <div className="ms-slider"
                        onPointerDown={handleVolumePointerDown}
                        onPointerMove={handleVolumePointerMove}
                        onPointerUp={handleVolumePointerUp}>
                        <div className="ms-slider-fill" style={{ width: `${volume * 100}%` }}></div>
                    </div>
                </div>
            </footer >
        </div >
    );
};

export default MackenSound;
