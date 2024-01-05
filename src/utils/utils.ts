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
    return changePrice >= 0 ? "+" + (changePrice * 1000).toFixed(2) + "(" + "+" + (changePricePercent * 100).toFixed(2) + "%)"
                                            :  (changePrice * 1000).toFixed(2) + "(" +  (changePricePercent * 100).toFixed(2) + "%)";
}

export const formatPrice = (price: number) => {
    if (typeof price !== 'number') {
      return 'Invalid price';
    }
    const priceString = (price * 1000).toString();
    const parts = priceString.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '0';
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedPrice = `${formattedInteger}.${decimalPart}`;
  
    return formattedPrice;
}

export const arrayToGraphData = (arr : number[], levelOfDetail : number) => {
    return arr.filter((_, index) => index % levelOfDetail === 0).map((a, index)=> {
        return {x: index, y: a}
    });
}

export const filterFinancialData = (rawData : any[], yearly : number) => {
    return rawData.filter(item => item.yearly === yearly).sort((a : any, b: any) => {
        if (a.year === b.year) {
            return a.quarter - b.quarter;
        } else {
            return a.year - b.year;
        }
    });
}



