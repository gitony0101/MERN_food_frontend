import hero from '../assets/hero.png';

const Hero = () => {
  return (
    <div>
      {/* biome-ignore lint/a11y/useAltText: <explanation> */}
      <img src={hero} className="w-full max-h-[600px] object-cover" />
    </div>
  );
};

export default Hero;
