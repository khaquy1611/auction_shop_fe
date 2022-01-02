import ReactNumeric from 'react-numeric';
import styles from "./inputNumberic.module.sass"
import * as _ from 'lodash'
 
function InputNumberic(props){
  const { value , onChange } = props; 
  return (
    <ReactNumeric
      className={styles.InputNumberic}
      value={value}
      currencySymbol='$'
      minimumValue="0"
      decimalCharacter="."
      digitGroupSeparator=","
      onChange={(event, value)=>{
        onChange(value)
      }}
    />
  );
}

export default InputNumberic