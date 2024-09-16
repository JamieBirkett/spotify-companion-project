import Image from "next/image";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Song } from "@/lib/types";
import pageMeta from "@/content/meta";
import MetaData from "@/components/MetaData";

export default function nowPlaying() {
  const { data: currentSong } = useSWR("/api/now-playing", fetcher, {refreshInterval : 5000});

  return (
    
    <section>
      <MetaData
        title={pageMeta.now_playing.title}
        description={pageMeta.now_playing.description}
        previewImage={pageMeta.now_playing.image}
        keywords={pageMeta.now_playing.keywords}
        
      />
        <div>
          {currentSong?.isPlaying ? (
            <WhenPlaying song={currentSong} />
          ) : (
            <NotPlaying song={currentSong || undefined}/>
          )}

          <div></div>
        </div>
    </section>
  );
}


function NotPlayingPlaceholder() {
    return (
        <div className="max-w-lg rounded overflow-hidden shadow-lg my-20 mx-auto">
          <Image className="w-full motion-safe:animate-spin"
                      alt={"Now playing placeholder"}
                      src={"/assets/now-playing-vinyl-record-placeholder.png"}
                      width={640}
                      height={640}
                      layout="fixed"
                      quality={50}
                      placeholder="blur"
                      blurDataURL={"/assets/now-playing-vinyl-record-placeholder.png"}
                    />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Nothing playing</div>
            <p className="text-gray-600 text-base">
            Album art and song details will be shown here when I start listening to Spotify.
            </p>
          </div>
        </div>
  );
}


function WhenPlaying({ song }: {song: Song}) {
    return (
<div className="max-w-lg rounded overflow-hidden shadow-lg my-20 mx-auto">
  <Image className="w-full"
              alt={song.title}
              src={song.albumImageUrl}
              width={640}
              height={640}
              layout="fixed"
              quality={100}
              placeholder="blur"
              blurDataURL={song.albumImageUrl}
            />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{song.title}</div>
    <p className="text-gray-600 text-base">
    {song.artist}
    </p>
  </div>
</div>
  );
}

function NotPlaying({ song }: { song: Song }) {
  if (song?.songUrl === undefined) {
    return NotPlayingPlaceholder();
  }
  else {
    return (
      <div className="max-w-lg rounded overflow-hidden shadow-lg my-20 mx-auto">
        <Image className="w-full"
          alt={song.title}
          src={song.albumImageUrl}
          width={640}
          height={640}
          layout="fixed"
          quality={100}
          placeholder="blur"
          blurDataURL={song.albumImageUrl}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{song.title}</div>
          <p className="text-gray-600 text-base">
            {song.artist}
          </p>
        </div>
      </div>

    );
  }
}
