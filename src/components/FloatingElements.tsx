const FloatingElements = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
            {/* Soft pink blob */}
            <div
                className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-[80px] animate-float opacity-70 will-change-transform"
                style={{ animationDuration: '20s' }}
            />

            {/* Light teal blob */}
            <div
                className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] animate-float-delayed opacity-50 will-change-transform"
                style={{ animationDuration: '25s' }}
            />

            {/* Amber accent blob */}
            <div
                className="absolute top-2/3 left-1/2 w-64 h-64 rounded-full bg-accent/5 blur-[60px] animate-float opacity-40 will-change-transform"
                style={{ animationDuration: '18s' }}
            />
        </div>
    );
};

export default FloatingElements;
