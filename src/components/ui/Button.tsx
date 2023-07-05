import { ButtonModel } from "@/models/ui/components.models";
import { ClassNames } from "@emotion/react";

function Button(props: ButtonModel) {
    const  { value, type, onClick, background, classNameStyle, size } = props;

    const btnSize = () => {
        if(size === 'sm') return '25%' ;
        if(size === 'md') return '50%' ;
        if(size === 'lg') return '75%' ;
        if(size === 'xl') return '100%';
    }

    return(
        <button 
            className={`rounded-md ${classNameStyle}` }
            style={{ background: `${background}`, width: `${btnSize()}` }}
            type={type}
            onClick={onClick}>{value}</button>
    )
}

export default Button;
