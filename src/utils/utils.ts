export const convertEpochToDateString= (epochSeconds : number) => {
    const date = new Date(epochSeconds * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();    
    const dateString = `${day}/${month}/${year}`;
    return dateString;
}

export const convertEpochToTimeString = (epochSeconds : number) => {
    const date = new Date(epochSeconds * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    return timeString;
}

export const hexToRgb = (hex : string) => {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
};

export const getColorPrice = (changePrice : number) => {
    return changePrice >= 0 ? {color: "#059926"} : {color: "#f65959"};
}

export const getTextChangePrice = (changePrice : number, changePricePercent : number) => {
    return changePrice >= 0 ? "+" + changePrice + "(" + "+" + (changePricePercent * 100).toFixed(2) + "%)"
                                            :  changePrice + "(" +  (changePricePercent * 100).toFixed(2) + "%)";
}

export const formatPrice = (price: number) => {
    if (typeof price !== 'number') {
      return 'Invalid price';
    }
    const priceString = price.toString();
    const parts = priceString.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '0';
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedPrice = `${formattedInteger}.${decimalPart}`;
  
    return formattedPrice;
  }


