import {css} from "emotion";

export const styles = (): string => {
    return css`
        position: sticky;
        text-align: center;
        top: 0;
        left: 0;
        right: 0;
        padding: 15px 0;
        margin-bottom: 20px;
        background-color: #0000002b;
        color: #fff;
        z-index: 1000;
        a {
          text-decoration: none;
          font-weight: bold;
          color: #ffffff;
          
          &:hover {
            text-shadow: 0 1px 15px #ffffff87;
          }
          
          span {
            border-bottom: 2px solid #fe79ed;
          }
        }
`;
}