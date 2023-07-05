type TruncateModel = {
     text: string , 
     breakAt: number
}

const useTruncate = (text, breakAt) => {
    if(text.length > breakAt){
        let brokenText = text.substr(0, breakAt)
        let truncatedText = brokenText + '...';
        return truncatedText;
    }else{
        return text;
    }
}

export default useTruncate;