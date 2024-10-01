

export const PageNotFound = () => {
    return (<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <img 
            src="src/assets/404.jpeg" 
            alt="404 Not Found" 
            className="max-w-full h-auto mb-6"
        />
        <p className="text-gray-600 text-lg">
            Oops! The page you're looking for doesn't exist.
        </p>
    </div>

    );
};

