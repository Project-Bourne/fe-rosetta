import Link from "next/link";
import { useRouter } from "next/router";

function Breadcrumbs() {
  const router = useRouter();
  const pathSegments = router.asPath
    .split("/")
    .filter((segment) => segment !== "");

  return (
    <div className="w-full border-b-[1px] py-3 pl-5 border-b-gray-100 flex gap-2 items-start">
      {pathSegments.map((crumb, i) => {
        // last route in the crumb trail exempts the current page route
        const isLastItem = i === pathSegments.length - 1;
        // iterate over the breadcrumb items and if it is not the last item, we use a next/link component. If it's the last item, we simply render the text.
        if (!isLastItem) {
          return (
            <>
              <Link
                href={router.asPath.split(crumb)[0] + crumb}
                key={i}
                className="text-sm text-sirp-primary hover:text-sirp-primary hover:underline capitalize"
              >
                {crumb}
              </Link>
              {/* separator */}
              <span className="text-gray-300"> / </span>
            </>
          );
        } else {
          return <span className="text-sm capitalize" key={i}>{crumb}</span>;
        }
      })}
    </div>
  );
}

export default Breadcrumbs;