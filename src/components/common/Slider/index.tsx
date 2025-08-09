import React from "react";
import {css} from "emotion";

export interface ISliderProps {
    defaultValue?: string | number;
    onResetClick?: () => void;
}

const styles = css`
  display: flex;
  align-items: center;

  > input {
    flex: 1;
  }

  a {
    width: 17px;
    height: 17px;
    display: flex;
    align-self: center;
    margin-left: 4px;
    padding: 2px;
    text-decoration: none;
    transition: all 0.2s ease;
    border-radius: 4px;
    
    &:hover {
      background: rgba(99, 102, 241, 0.1);
    }

    img {
      width: 100%;
      height: 100%;
      opacity: 0.6;
      transition: opacity 0.2s ease;
    }

    &:hover img {
      opacity: 1;
    }
  }

  /* Mobile improvements */
  @media (max-width: 768px) {
    a {
      width: 32px;
      height: 32px;
      margin-left: 8px;
      padding: 6px;
      background: rgba(99, 102, 241, 0.1);
      border-radius: 6px;
      
      &:active {
        background: rgba(99, 102, 241, 0.2);
        transform: scale(0.95);
      }
    }
  }

  @media (max-width: 480px) {
    a {
      width: 36px;
      height: 36px;
      padding: 8px;
    }
  }
`

export const Slider = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & ISliderProps) => {
    const { onResetClick, ...inputProps } = props;
    
    const handleResetClick = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onResetClick) {
            onResetClick();
        }
    };
    
    return (
        <div className={styles}>
            <input {...inputProps} />
            {onResetClick && (
                <a 
                    title={'Reset'} 
                    onClick={handleResetClick}
                    onTouchStart={handleResetClick}
                    href={'#!'}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onResetClick();
                        }
                    }}
                >
                    <img alt={'reset'} src={'images/reset.svg'}/>
                </a>
            )}
        </div>
    )
}