import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useRef } from 'react';
import { MdMyLocation } from 'react-icons/md';


const containerStyle = {
    width: '100%',
    height: '400px',
};

type PropsType = {
    center: Position,
    setPos: (e: Position) => void,
    pos?: Position
}
const locations: [] = []
export default function MapInput({ center,setPos,pos }: PropsType) {
    const mapRef = useRef<google.maps.Map | null>(null);

    const onLoad = (map: google.maps.Map) => {
        mapRef.current = map;
        getMyLocation()

    };

    const fitBounds = (map: google.maps.Map) => {

        map.moveCamera({ center })
    };

    useEffect(() => {
        if (mapRef.current) {
            fitBounds(mapRef.current);
        }
    }, [locations]);


    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            setPos({ lat: event.latLng.lat(), lng: event.latLng.lng() })
        }
    };
    const getMyLocation = () => {
        navigator?.permissions?.query({ name: 'geolocation' }).then((_) => {
            navigator?.geolocation?.getCurrentPosition(pos => {
                setPos({ lat: pos.coords.latitude, lng: pos.coords.longitude })
                mapRef.current?.moveCamera({ center: { lat: pos.coords.latitude, lng: pos.coords.longitude } })
            }) ?? mapRef.current?.moveCamera({ center })
        }) ?? mapRef.current?.moveCamera({ center })
    }
    useEffect(() => {
        getMyLocation()
    }, [])
    return <div className='overflow-hidden rounded-md border relative'>
        <div className='relative z-0'>
            <LoadScript googleMapsApiKey="AIzaSyD051kpbZvUaDLyqrOwtlQ0nS0SipkCbEE">
                <GoogleMap
                    onLoad={onLoad}
                    mapContainerStyle={containerStyle}
                    center={center}

                    zoom={14}
                    onClick={handleMapClick}
                >
                    {pos && <Marker position={pos} />}
                </GoogleMap>
            </LoadScript>
        </div>
        <div onClick={getMyLocation}   className='absolute p-2 bg-white z-0 bottom-2 left-2'>
            <MdMyLocation className='w-5 h-5'/>
        </div>
    </div>
}
