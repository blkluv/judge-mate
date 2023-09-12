import React from 'react';
import styles from './BranchSegment.module.css';

const BranchSegment = ({
  imageSrc,
  companyName,
  services,
  heading,
  buttonText
}) => {
  const serviceLinks = services.split(',').map(service => service.trim());
  
  return (
    <div className={styles.BranchSegment}>
      <img src={imageSrc} alt={companyName} className={styles.img} />
      <div className={styles.top}>
        <h1 className={styles.h1}>{companyName}</h1>
        <div className={styles.serviceContainer}>
    {serviceLinks.map((service, index) => (
      <a 
        key={index} 
        href={`/${service}`}
        className={styles.serviceLink}
      >
        {service}
      </a>
    ))}
</div>

      </div>
      <div className={styles.bottom}>
        <h1 className={styles.h1}>{heading}</h1>
        <button className={styles.button}>{buttonText}</button>
      </div>
    </div>
  );
};

export default BranchSegment;
