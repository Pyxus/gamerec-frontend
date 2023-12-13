import {
  Combobox,
  TextInput,
  useCombobox,
  Button,
  NumberInput,
} from "@mantine/core";
import "./index.css";
import { GameSearchResult } from "@/types";

interface GameSelectProps {
  isSearchingDatabase: boolean;
  selectedGameName: string;
  gameSearchResults: GameSearchResult[];
  onGameRemoved: () => void;
  onGameRatingChanged: (newRating: number) => void;
  onGameSelected: (game: GameSearchResult) => void;
  onGameSearchTextChanged: (newSearchText: string) => void;
}

function GameSelect({
  isSearchingDatabase,
  onGameRemoved,
  onGameRatingChanged,
  onGameSelected,
  onGameSearchTextChanged,
  selectedGameName,
  gameSearchResults,
}: GameSelectProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const shouldFilterOptions = !gameSearchResults.some(
    (item) => item.name === selectedGameName
  );

  const gameOptions = shouldFilterOptions
    ? gameSearchResults.filter((item) =>
        item.name.toLowerCase().includes(selectedGameName.toLowerCase().trim())
      )
    : gameSearchResults;

  const options = isSearchingDatabase
    ? SearchingForGameOption(selectedGameName)
    : GameOptions(gameOptions);

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        if (!isSearchingDatabase) {
          onGameSelected(gameOptions[Number(optionValue)]);
          combobox.closeDropdown();
        }
      }}
      store={combobox}
    >
      <Combobox.Target>
        <div className="selection-list">
          <Button
            className="remove-button"
            variant="light"
            onClick={onGameRemoved}
          >
            X
          </Button>
          <TextInput
            w={"100%"}
            placeholder="Start typing a game title..."
            value={selectedGameName}
            onChange={(event) => {
              const gameSearchText = event.currentTarget.value;

              if (!isSearchingDatabase) combobox.selectFirstOption();

              onGameSearchTextChanged(gameSearchText);

              gameSearchText.length > 0
                ? combobox.openDropdown()
                : combobox.closeDropdown();
            }}
            onClick={() => {
              if (selectedGameName.length > 0) combobox.openDropdown();
            }}
            onFocus={() => {
              if (selectedGameName.length > 0) combobox.openDropdown();
            }}
            onBlur={() => combobox.closeDropdown()}
          />
          <NumberInput
            defaultValue={1}
            pl={5}
            w={"15%"}
            onChange={(value) => onGameRatingChanged(Number(value))}
          />
        </div>
      </Combobox.Target>

      <Combobox.Dropdown>{options}</Combobox.Dropdown>
    </Combobox>
  );
}

function SearchingForGameOption(gameName: string) {
  return (
    <Combobox.Option value={`Searching database for ${gameName}...`} key={-1}>
      {"Searching database for "}
      <b>{`${gameName}...`}</b>
    </Combobox.Option>
  );
}

function GameOptions(games: GameSearchResult[]) {
  if (games.length === 0) {
    return [<Combobox.Empty>Nothing found</Combobox.Empty>];
  } else {
    return games.map((item, index) => (
      <Combobox.Option value={String(index)} key={index}>
        {item.name}
        {` (${new Date(item.first_release_date * 1000).getFullYear()})`}
      </Combobox.Option>
    ));
  }
}

export default GameSelect;
