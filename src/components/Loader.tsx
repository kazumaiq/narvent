import { motion } from 'framer-motion';

interface LoaderProps {
  progress?: number;
}

export default function Loader({ progress }: LoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.08,
        filter: 'blur(12px)',
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#020206',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Мягкие космические туманности на фоне */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          width: 'clamp(300px, 50vw, 600px)',
          height: 'clamp(300px, 50vw, 600px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 70, 239, 0.28) 0%, rgba(56, 189, 248, 0.15) 45%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Центральный квантовый резонатор / сингулярность (БЕЗ ТЕКСТА) */}
      <div
        style={{
          position: 'relative',
          width: '180px',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Внешнее кольцо пульсации */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.06, 1],
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
            scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1.5px dashed rgba(217, 70, 239, 0.55)',
            boxShadow: '0 0 35px rgba(217, 70, 239, 0.25)',
          }}
        />

        {/* Противоположно вращающееся орбитальное кольцо с маркерами */}
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            inset: '16px',
            borderRadius: '50%',
            border: '1px solid rgba(56, 189, 248, 0.45)',
          }}
        >
          {/* Орбитальный квантовый узел */}
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#38bdf8',
              boxShadow: '0 0 15px #38bdf8, 0 0 30px #38bdf8',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#d946ef',
              boxShadow: '0 0 15px #d946ef',
            }}
          />
        </motion.div>

        {/* Третье внутреннее тонкое кольцо гармоник */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            rotate: { duration: 3.5, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{
            position: 'absolute',
            inset: '34px',
            borderRadius: '50%',
            border: '1.5px solid rgba(192, 132, 252, 0.65)',
            boxShadow: 'inset 0 0 20px rgba(192, 132, 252, 0.3)',
          }}
        />

        {/* Центральное сингулярное ядро звука */}
        <motion.div
          animate={{
            scale: [0.85, 1.25, 0.85],
            boxShadow: [
              '0 0 25px rgba(217, 70, 239, 0.6), 0 0 50px rgba(56, 189, 248, 0.4)',
              '0 0 45px rgba(217, 70, 239, 0.9), 0 0 80px rgba(56, 189, 248, 0.7)',
              '0 0 25px rgba(217, 70, 239, 0.6), 0 0 50px rgba(56, 189, 248, 0.4)',
            ],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ffffff 15%, #c084fc 60%, #020206 100%)',
          }}
        />

        {/* Радиальные звуковые лучи-волны */}
        {[0, 45, 90, 135].map((deg) => (
          <motion.div
            key={deg}
            animate={{
              opacity: [0.2, 0.75, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: deg * 0.005,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: '1px',
              height: '140px',
              background: 'linear-gradient(180deg, transparent, rgba(217, 70, 239, 0.5), transparent)',
              transform: `rotate(${deg}deg)`,
              pointerEvents: 'none',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
