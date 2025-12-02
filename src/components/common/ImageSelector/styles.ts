import {css} from "emotion";
import {Routes} from "../../../stores/routeStore";

export const styles = (currentRoute?: Routes): string => {
    return css`
          width: 100%;
          background-color: #ffffff;
          padding: 50px 30px 50px 30px;

          min-height: ${currentRoute === Routes.MockupApp ? '40vh' : 'auto'};

          text-align: center;
          font-size: 1.2em;
          cursor: pointer;
          display: flex;
          vertical-align: middle;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          border-radius: 10px;
          color: #333333;
        
          .dropzone {
            height: fit-content;
            
            p {
              color: #333333;
              margin-bottom: 10px;
              
              b {
                color: #211540;
                font-weight: 600;
              }
            }
          }
          
          .drop-here {
            padding: 70px;
            border: 2px dashed #e4e4e4;
            margin-bottom: 20px;
            border-radius: 5px;
            color: #666666;
            background: #f9f9f9;
            font-weight: 500;
          }
          
          .url-form {
            max-width: 500px;
            
            button {
              color: #fff;
              background-color: #fe79ed;
              border-color: #fd7aec;
              border-radius: 0 5px 5px 0 !important;
             }
             @media screen and (max-width: 500px) {
              input[type="text"] {
                width: 100%;
                border-radius: 5px 5px 0 0 !important;
              }
              .input-group-text {
                border-radius: 0 0 0 5px !important;
                border-right: none;
                border-top: none;
                margin-left: 0;
                width: 70%;
              }
              button {
                border: none;
                border-radius: 0 0 5px 0 !important;
                margin-left: 0 !important;
                width: 30%;
              }
             }
          }
        
          svg {
            width: 50px;
            height: auto !important;
            fill: #211540;
          }
        
          &.dragActive {
            background-color: #fff;
          }
      
          .demo-image {
            margin-top: 30px;
            color: #333333;
            
            button {
              padding: 0;
              margin: 0;
              color: #534473;
              text-decoration: none;
              border-bottom: 2px solid #fe79ed;
              border-radius: 0;
              
              :hover {
                text-shadow: 0 1px 15px #53447387
              }
            }
          }
`
};