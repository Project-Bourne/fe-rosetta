import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

function Training() {
  const router = useRouter();

  useEffect(() => {
    router.push(
      {
        pathname: `/training/all`,
      },
      undefined,
      { shallow: true }
    )
  }, []);

  return (
    <></>
  )
}

export default Training;