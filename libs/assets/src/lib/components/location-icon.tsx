import React from 'react';

const Location: React.FC<{ stroke: string }> = ({ stroke }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M11.9026 5.98087C11.3092 5.98087 10.7292 6.15681 10.2359 6.48646C9.74253 6.8161 9.35801 7.28464 9.13095 7.83282C8.90389 8.38099 8.84448 8.98419 8.96023 9.56614C9.07599 10.1481 9.36171 10.6826 9.78127 11.1022C10.2008 11.5217 10.7354 11.8075 11.3173 11.9232C11.8993 12.039 12.5025 11.9796 13.0506 11.7525C13.5988 11.5254 14.0674 11.1409 14.397 10.6476C14.7266 10.1542 14.9026 9.57421 14.9026 8.98087C14.9017 8.18549 14.5853 7.42296 14.0229 6.86055C13.4605 6.29813 12.698 5.98177 11.9026 5.98087ZM11.9026 10.4809C11.6059 10.4809 11.3159 10.3929 11.0692 10.2281C10.8226 10.0632 10.6303 9.82898 10.5168 9.55489C10.4032 9.2808 10.3735 8.9792 10.4314 8.68823C10.4893 8.39726 10.6322 8.12998 10.8419 7.92021C11.0517 7.71043 11.319 7.56756 11.61 7.50969C11.9009 7.45181 12.2025 7.48152 12.4766 7.59505C12.7507 7.70858 12.985 7.90084 13.1498 8.14751C13.3146 8.39418 13.4026 8.68419 13.4026 8.98087C13.4021 9.37855 13.2439 9.75981 12.9627 10.041C12.6815 10.3222 12.3003 10.4804 11.9026 10.4809Z"
                fill={stroke}
            />
            <path d="M17.6674 3.21164C16.242 1.78666 14.3394 0.940164 12.3266 0.835526C10.3138 0.730889 8.33366 1.37553 6.76824 2.64503C5.20282 3.91453 4.16314 5.71889 3.84985 7.70987C3.53656 9.70086 3.97187 11.7373 5.07178 13.4262L10.7393 22.1268C10.8654 22.3204 11.0379 22.4795 11.241 22.5896C11.4441 22.6997 11.6716 22.7574 11.9026 22.7574C12.1337 22.7574 12.3611 22.6997 12.5642 22.5896C12.7674 22.4795 12.9398 22.3204 13.0659 22.1268L18.7336 13.4262C19.7542 11.8595 20.2052 9.98962 20.0111 8.12992C19.817 6.27023 18.9895 4.53379 17.6674 3.21164ZM17.4768 12.6075L11.9026 21.1645L6.3284 12.6075C4.62215 9.98812 4.98811 6.48281 7.19854 4.27228C7.81629 3.65452 8.54966 3.16448 9.35679 2.83015C10.1639 2.49582 11.029 2.32374 11.9026 2.32374C12.7763 2.32374 13.6414 2.49582 14.4485 2.83015C15.2556 3.16448 15.989 3.65452 16.6067 4.27228C18.8172 6.48281 19.1831 9.98812 17.4768 12.6075Z"
                fill={stroke}
            />
        </svg>
    );
};

export default Location;
