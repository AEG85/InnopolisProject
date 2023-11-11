import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { UserContext } from '../../contexts/userDetails';
import './styles.css';


export const Switch = ({ action = '#', }: { action: string }) => {
    const [isOn, setIsOn] = useState(false)
    const { setUsername } = useContext(UserContext)

    const toggleSwitch = () => {
        setIsOn(!isOn)
        switch (action) {
            case 'logOut':
                setTimeout(() => {
                    setUsername(null)
                }, 500)
                break
        }

    }
    return (
        <div
            style={{
                background: isOn ? "#17a2b8" : "rgba(203,213,224,0.5)",
                justifyContent: isOn ? "flex-end" : "",
                width: "3rem",
                height: "2rem",
                padding: "0.25rem",
                display: "flex",
                borderRadius: 9999,
                cursor: "pointer"
            }}
            onClick={toggleSwitch}
        >
            <motion.div
                style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    background: "white",
                    borderRadius: "100%",
                    boxShadow:
                        "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                }}
                layout
            >
            </motion.div>
        </div >
    )
}