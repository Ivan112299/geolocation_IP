export function addOffset(map){
 
    const offsetY = map.getSize().y * 0.10;
    map.panBy([0, -offsetY ]);
}