const ExerciseVideos = ({ exerciseVideos, name }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-2">
        Watch <span className="text-red-500 capitalize">{name}</span> Exercise
        Videos
      </h2>
      <p className="text-center text-gray-400 mb-10 text-sm tracking-wide uppercase">
        Curated tutorials from YouTube
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {exerciseVideos?.slice(0, 6).map((item, index) => (
          <a
            key={index}
            href={"https://www.youtube.com/watch?v=" + item.video.videoId}
            target="_blank"
            rel="noreferrer"
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.video.thumbnails[0].url}
                alt={item.video.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-gray-900 font-semibold text-sm leading-snug line-clamp-2 mb-2 group-hover:text-red-500 transition-colors duration-200">
                {item.video.title}
              </h3>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                {item.video.channelName}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ExerciseVideos;
