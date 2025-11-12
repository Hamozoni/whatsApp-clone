import { useContext, useState } from "react";
import { IoCloseSharp, IoColorPaletteSharp } from "react-icons/io5";
import { UserContext } from "../../../../contexts/index";
import { PostStatusFooter } from "../components/postStatusFooter";
import { EmojiBtn } from "../../../../components/ui/emojiBtn";
import { postData } from "../../../../lib/postData";
import { CloseModel } from "../../../../components/modal/closeModel";
import {TransparantLoader} from "../../../../components/modal/transparantLoader";

const bgColors = ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#009688','#4caf50','#8bc34a','#cddc39','#ffeb3b','#795548','#607d8b'];
const fontFamilies = [
  "Arial, sans-serif",
  "'Dancing Script', cursive",
  "'Courier New', monospace",
  "'Roboto', sans-serif",
  "'Pacifico', cursive"
];

const ColorPicker = ({ selectedColor, onSelect }) => (
  <div className="absolute flex items-center gap-2 right-0 top-full z-50 max-w-screen overflow-x-auto px-3">
    {bgColors.map(color => (
      <button
        key={color}
        style={{ backgroundColor: color }}
        onClick={() => onSelect(color)}
        className={`w-8 h-8 min-w-8 rounded-full border-white ${color === selectedColor ? 'border-4' : 'border'}`}
      />
    ))}
  </div>
);
const StatusPostText = ({ setStatusType }) => {
  const { user } = useContext(UserContext);

  const [bgColor, setBgColor] = useState(bgColors[0]);
  const [fontIndex, setFontIndex] = useState(0);
  const [text, setText] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentFont = fontFamilies[fontIndex];

  const handleFont = () => {
    setFontIndex((prevIndex) => (prevIndex + 1) % fontFamilies.length);
  };

  const handleSubmitStatus = async () => {
    setError(null);
    setIsLoading(true);

    const formData = {
      user: user?._id,
      text,
      text_bg_color: bgColor,
      font_family: currentFont,
      type: 'TEXT'
    };

    try {
      const data = await postData('status', formData);
      if (data) setStatusType(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
        style={{ backgroundColor: bgColor }} 
        className="fixed z-50 inset-0 flex flex-col justify-between"
        >
      {/* Header */}
      <header >
        <div className="container max-w-[970px] mx-auto flex items-center justify-between p-3">
          <button onClick={() => setStatusType(null)}>
            <IoCloseSharp size={26} />
          </button>
          <div className="flex items-center gap-3">
            {/* Emoji Picker */}
            <EmojiBtn setText={setText} />
                {/* Font Picker */}
            <button 
                  onClick={handleFont} 
                  style={{ fontFamily: currentFont }} 
                  className="hover:bg-[#00000046] rounded-full w-10 h-10 text-3xl"
                  >
              T
            </button>

            {/* Color Picker */}
            <div className="relative">
              <button 
                  onClick={() => setShowColorPicker(!showColorPicker)} 
                  className="hover:bg-[#00000046] rounded-full p-2"
                  >
                <IoColorPaletteSharp size={26} />
              </button>
              {showColorPicker && (
                <>
                  <ColorPicker selectedColor={bgColor} onSelect={setBgColor} />
                  <CloseModel setCloseModel={setShowColorPicker} />
                </>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Text Area */}
      <div className="p-3 flex items-center justify-center relative">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ fontFamily: currentFont }}
          className={`p-3 text-2xl md:text-6xl text-white outline-0 resize-none w-full`}
        />
        {!text && (
          <p 
            style={{ fontFamily: currentFont }} 
            className="absolute top-3 -z-10 text-2xl md:text-6xl text-white">
            Type a status
          </p>
        )}
      </div>

      {/* Footer */}
      <PostStatusFooter onClick={handleSubmitStatus} />
      {/* Loader */}
      {isLoading && (
        <TransparantLoader />
      )}
    </div>
  );
};

export default StatusPostText;
