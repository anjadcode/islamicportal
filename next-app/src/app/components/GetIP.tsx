"use-client"

import { useEffect, useState } from "react";
import { LocationData } from "../types/location";



const EXPRESS_API_URL =
    process.env.NEXT_PUBLIC_EXPRESS_API_URL || "http://localhost:3001";

const IpLocation = () => {
    const [location, setLocation] = useState<LocationData | null>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const responsea = await fetch(`${EXPRESS_API_URL}/api/get-ip`);
                const dataip = await responsea.json();
                console.log("User IP:", dataip.ip.ip)

                const response = await fetch(`http://ip-api.com/json/${dataip.ip.ip}`);
                const data: LocationData = await response.json();
                console.log
                setLocation(data);
            } catch (error) {
                console.error("Error fetching IP location:", error);
            }
        };

        fetchLocation();
    }, []);

    return location;
};

export default IpLocation;
