type LeafValue = string | number | boolean | null;
type LeafValueType = 'string' | 'number' | 'boolean';
type LeafPath = Array<string | number>;

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
interface JSONObject {
  [x: string]: JSONValue;
}
type JSONArray = Array<JSONValue>;
