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

|Name|Description|Type|
|----|-----------|----|
|[map](#map)|Device mapping<br/>|object\[\]|
|host|Host name of the owserver<br/><br/>Default: `"localhost"`|string|
|port|Port of the owserver<br/><br/>Default: `4304`|number|

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

Device mapping


**Items**


Debug output text

**Item Properties**

|Name|Description|Type|
|----|-----------|----|
|map|1-Wire device id (in format from OWFS)<br/>|string|
|node|Node name to publish data to<br/>|string|
|[metadata](#mapmetadata)|Metadata for that device<br/><br/>Default: `{"type":"temperature.data","unit":"C","unit_long":"Celsius"}`|object|

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


**Additional Properties:** `true`<br/>
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
