<!--
Auto generated documentation:
  * Adapt schema.json and
  * Run npm run doc

Please edit schema.json or
	https://github.com/simonwalz/osiota-dev/blob/master/partials/main.md
-->
<a name="root"></a>
# osiota application onewire-owfs

*Osiota* is a software platform capable of running *distributed IoT applications* written in JavaScript to enable any kind of IoT tasks. See [osiota](https://github.com/osiota/osiota).

## Configuration: onewire-owfs


This application collects temperature values (and other data) from 1-Wire devices via owfs (1-Wire filesystem).

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|[**map**](#map)|`object[]`|Device mappings<br/>|no|
|**host**|`string`|Host name of the owserver<br/>Default: `"localhost"`<br/>|no|
|**port**|`number`|Port of the owserver<br/>Default: `4304`<br/>|no|

**Additional Properties:** not allowed<br/>
**Example**

```json
{
    "map": [
        {
            "map": "28.AB8967452301",
            "node": "/Außen/Außentemperatur",
            "metadata": {
                "type": "temperature.data",
                "unit": "C",
                "unit_long": "Celsius"
            }
        }
    ],
    "host": "localhost",
    "port": 4304
}
```

<a name="map"></a>
### map\[\]:

Device mappings


**Items: Device mapping**

**Item Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**map**|`string`|1-Wire device id (in format from OWFS)<br/>|yes|
|**node**|`string`|Node name to publish data to<br/>|no|
|[**metadata**](#mapmetadata)|`object`|Metadata for that device<br/>Default: `{"type":"temperature.data","unit":"C","unit_long":"Celsius"}`<br/>|no|

**Item Additional Properties:** not allowed<br/>
**Example**

```json
[
    {
        "map": "28.AB8967452301",
        "node": "/Außen/Außentemperatur",
        "metadata": {
            "type": "temperature.data",
            "unit": "C",
            "unit_long": "Celsius"
        }
    }
]
```

<a name="mapmetadata"></a>
#### map\[\]\.metadata:

Metadata for that device


**Additional Properties:** allowed<br/>
**Example**

```json
{
    "type": "temperature.data",
    "unit": "C",
    "unit_long": "Celsius"
}
```


## How to setup

Add a configuration object for this application, see [osiota configuration](https://github.com/osiota/osiota/blob/master/doc/configuration.md):

```json
{
    "name": "onewire-owfs",
    "config": CONFIG
}
```

## License

Osiota and this application are released under the MIT license.

Please note that this project is released with a [Contributor Code of Conduct](https://github.com/osiota/osiota/blob/master/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
