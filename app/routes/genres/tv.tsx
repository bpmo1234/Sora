import { Button } from '@nextui-org/button';
import { Badge } from '@nextui-org/react';
import { Spacer } from '@nextui-org/spacer';
import { NavLink, useLocation, useNavigate } from '@remix-run/react';
import { motion, type PanInfo } from 'framer-motion';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { useHydrated } from 'remix-utils';

import { useTypedRouteLoaderData } from '~/hooks/useTypedRouteLoaderData';

export const handle = {
  breadcrumb: () => (
    <NavLink to="/genres/tv" aria-label="Tv Show Genres">
      {({ isActive }) => (
        <Badge
          color="primary"
          variant="flat"
          css={{
            opacity: isActive ? 1 : 0.7,
            transition: 'opacity 0.25s ease 0s',
            '&:hover': { opacity: 0.8 },
          }}
        >
          Tv Show Genres
        </Badge>
      )}
    </NavLink>
  ),
  miniTitle: () => ({
    title: 'Genres',
    subtitle: 'Tv Show',
    showImage: false,
  }),
};

const TvGenresPage = () => {
  const navigate = useNavigate();
  const { genresTv } = useTypedRouteLoaderData('root');
  const { t } = useTranslation('genres');
  const location = useLocation();
  const isHydrated = useHydrated();

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset?.x > 100) {
      navigate('/genres/movie');
    }
    if (info.offset?.x < -100 && info.offset?.y > -50) {
      navigate('/genres/anime');
    }
  };
  return (
    <motion.div
      key={location.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex w-full flex-col items-center justify-center px-3 sm:px-0"
      drag={isMobile && isHydrated ? 'x' : false}
      dragConstraints={isMobile && isHydrated ? { left: 0, right: 0 } : false}
      dragElastic={isMobile && isHydrated ? 0.7 : false}
      onDragEnd={handleDragEnd}
      dragDirectionLock={isMobile && isHydrated}
      draggable={isMobile && isHydrated}
    >
      <h4>{t('tv-show-genres')}</h4>
      <Spacer y={5} />
      <div className="grid grid-cols-1 justify-center gap-3 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {Object.entries(genresTv).map(([id, name]) => (
          <Button
            key={id}
            color="primary"
            type="button"
            variant="flat"
            onPress={() => navigate(`/discover/tv-shows?with_genres=${id}`)}
          >
            {name}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default TvGenresPage;
