export default function Character({bgcolor, gcolor}:{bgcolor:string, gcolor:string}) {
  return <svg width="390" height="342" viewBox="0 0 390 340" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M107 18.5C58.3875 38.1239 36.3421 55.5725 0.5 91L1 340.5H390V91C359.07 58.8419 335.404 42.4974 283.5 18.4999C215.321 -2.17282 178.542 -6.2725 107 18.5Z" fill={bgcolor} stroke={bgcolor} stroke-width="2"/>
  <rect x="60" y="151.857" width="269.571" height="19.4286" rx="9.71429" fill={gcolor}/>
  <circle cx="256.714" cy="164" r="51" fill={gcolor}/>
  <circle cx="257.321" cy="163.393" r="37.0357" fill="black"/>
  <circle cx="245.178" cy="150.036" r="11.5357" fill="white"/>
  <circle cx="230.607" cy="165.821" r="5.46429" fill="white"/>
  <circle cx="134.071" cy="164" r="51" fill={gcolor}/>
  <circle cx="134.679" cy="163.393" r="37.0357" fill="black"/>
  <circle cx="122.536" cy="150.036" r="11.5357" fill="white"/>
  <circle cx="107.964" cy="165.821" r="5.46429" fill="white"/>
  <circle cx="195.5" cy="230.5" r="15.5" fill="black"/>
  <circle cx="260.961" cy="238.553" r="18.4472" fill="white"/>
  <path d="M259.229 205C259.999 203.667 261.923 203.667 262.693 205L278.248 231.941C279.017 233.275 278.055 234.941 276.516 234.941H245.406C243.867 234.941 242.904 233.275 243.674 231.941L259.229 205Z" fill="white"/>
  </svg> 
}