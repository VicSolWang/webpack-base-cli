/**
 * Created by VicSolWang.
 * Date: 2020-01-24 23:18
 * Email: vic.sol.wang@gmail.com
 */

const deepCopy = (targetObj = {}, sourceObj = {}) => {
	const tempData = targetObj;
	Object.keys(sourceObj).forEach((item) => {
		if (typeof sourceObj[item] === 'object') {
			deepCopy(
				tempData[item] ? tempData[item] : (tempData[item] = {}),
				sourceObj[item],
			);
		} else {
			tempData[item] = sourceObj[item];
		}
	});
	return tempData;
};

module.exports = deepCopy;
