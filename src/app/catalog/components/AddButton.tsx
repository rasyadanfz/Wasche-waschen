import Button from "@/components/Button";
import { useState } from "react"

const AddButton = () => {
  const [count, setCount] = useState(0);
  const [showTambahButton, setShowTambahButton] = useState(true);

  const handleAdd = () => {
    setCount((prevCount) => prevCount + 1);
  }

  const handleSubstract = () => {
    if (count > 0) {
      setCount((prevCount) => {
        if (prevCount === 1) {
          setShowTambahButton(true);
        }
        return prevCount - 1
      });
    }
  }

  const handleTambah = () => {
    setShowTambahButton(false);
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div>
      {showTambahButton ? (
          <Button onClick={handleTambah} text="+Tambah" className="p-2" />
        )
        : (
          <>
            <button onClick={handleAdd}>+</button>
            <h1>{count}</h1>
            <button onClick={handleSubstract}>-</button>
          </>
      )}
    </div>
  )
}

export default AddButton