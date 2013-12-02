// From StackOverflow.com
// http://stackoverflow.com/questions/8024149/is-it-possible-to-get-the-non-enumerable-inherited-property-names-of-an-object/8024294#8024294

function getAllPropertyNames( obj ) {
        var props = [];

            do {
                        Object.getOwnPropertyNames( obj ).forEach(function ( prop ) {
                                        if ( props.indexOf( prop ) === -1 ) {
                                                            print(prop);
                                                            props.push( prop );
                                                                        }
                                                });
                            } while ( obj = Object.getPrototypeOf( obj ) );

                return props;
}

var oo = {'key1': 'val1'};
getAllPropertyNames(oo);
