import React from 'react';
import defaultImage from '../assets/profile.png'

const ProfileImageWithDefault = (props) => {
    const { className, width, height,  image, tempimage } = props;
    let imageSource = defaultImage;
    if (image) {
        imageSource = 'images/profile/'+image;
    }

    return (
        <img
            src={tempimage || imageSource}
            alt={`Profile`}
            className={className}
            width={width}
            height={height}
            onError={event => {
                event.target.src = defaultImage;
            }}
        />
    );
};

export default ProfileImageWithDefault;