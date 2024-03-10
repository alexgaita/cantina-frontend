import { COLORS, FILTER_OPTIONS } from "../../../utils/constants";
import FilterCard from "../FilterCard/FilterCard";
import DailyMenuIcon from "../icons/DailyMenuIcon";
import DesertIcon from "../icons/DesertIcon";
import FelPrincipalIcon from "../icons/FelPrincipalIcon";
import GarnituriIcon from "../icons/GarnituriIcon";
import SosuriIcon from "../icons/SosuriIcon";
import SupeIcon from "../icons/SupeIcon";

interface IFilters {
  filtersClicked: string[];
  handleClickFilter: (filter: string) => void;
}

const Filters = ({ filtersClicked, handleClickFilter }: IFilters) => {
  console.log("filtersClicked", filtersClicked);

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        marginBottom: 30,
      }}
    >
      <FilterCard
        image={<DailyMenuIcon fillColor={COLORS.PRIMARY_COLOR} />}
        imageHovered={<DailyMenuIcon fillColor="white" />}
        option={FILTER_OPTIONS.DAILY_MENU}
        filtersClicked={filtersClicked}
        handleClick={handleClickFilter}
      />
      <FilterCard
        image={<SupeIcon fillColor={COLORS.PRIMARY_COLOR} />}
        imageHovered={<SupeIcon fillColor="white" />}
        option={FILTER_OPTIONS.SOUP}
        filtersClicked={filtersClicked}
        handleClick={handleClickFilter}
      />
      <FilterCard
        image={<FelPrincipalIcon fillColor={COLORS.PRIMARY_COLOR} />}
        imageHovered={<FelPrincipalIcon fillColor="white" />}
        option={FILTER_OPTIONS.MAIN_COURSE}
        filtersClicked={filtersClicked}
        handleClick={handleClickFilter}
      />
      <FilterCard
        image={<GarnituriIcon fillColor={COLORS.PRIMARY_COLOR} />}
        imageHovered={<GarnituriIcon fillColor="white" />}
        option={FILTER_OPTIONS.GARNISH}
        filtersClicked={filtersClicked}
        handleClick={handleClickFilter}
      />

      <FilterCard
        image={<DesertIcon fillColor={COLORS.PRIMARY_COLOR} />}
        imageHovered={<DesertIcon fillColor="white" />}
        option={FILTER_OPTIONS.DESSERT}
        filtersClicked={filtersClicked}
        handleClick={handleClickFilter}
      />
      <FilterCard
        image={<SosuriIcon fillColor={COLORS.PRIMARY_COLOR} />}
        imageHovered={<SosuriIcon fillColor="white" />}
        option={FILTER_OPTIONS.EXTRA}
        filtersClicked={filtersClicked}
        handleClick={handleClickFilter}
      />
    </div>
  );
};

export default Filters;
