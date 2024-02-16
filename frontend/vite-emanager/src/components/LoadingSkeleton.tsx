import { Table } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface LoadingSkeletonPropType {
  rows: number;
}
const LoadingSkeleton = ({ rows }: LoadingSkeletonPropType) => {
  return (
    <SkeletonTheme baseColor="#adb5bd" highlightColor="#ced4da">
      <Table className="text-center">
        <thead>
          <tr>
            <th>
              <Skeleton height={35} />
            </th>
            <th className="minWidthTh">
              <Skeleton height={35} />
            </th>
            <th>
              <Skeleton height={35} />
            </th>
            {/* <th className="d-none d-md-table-cell">Admin Email</th> */}
            {/* <th className="d-md-none maxWidthTh">Admin Email</th> */}
            <th className="d-none d-md-table-cell">
              <Skeleton height={35} />
            </th>
            <th className="d-none d-md-table-cell">
              <Skeleton height={35} />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array(rows)
            .fill(0)
            .map((_item, index) => (
              <tr key={index}>
                <td>
                  <Skeleton height={20} />
                </td>
                <td>
                  <Skeleton height={20} />
                </td>
                <td>
                  <Skeleton height={20} />
                </td>
                <td className="d-none d-md-table-cell">
                  <Skeleton height={20} />
                </td>
                <td className="d-none d-md-table-cell">
                  <Skeleton height={20} />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </SkeletonTheme>
  );
};

export default LoadingSkeleton;
