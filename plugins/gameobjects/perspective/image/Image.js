import TransformVerts from '../utils/TransformVerts';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const GenerateGridVerts = Phaser.Geom.Mesh.GenerateGridVerts;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

const FOV = 45;
const PanZ = 1 + (1 / Math.sin(DegToRad(FOV)));

class Image extends Phaser.GameObjects.Mesh {
    constructor(scene, x, y, key, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            key = GetValue(config, 'key', null);
            frame = GetValue(config, 'frame', null);
        }

        super(scene, x, y, key, frame);
        this.type = 'rexPerspectiveImage';
        this.setSizeToFrame();

        this.setPerspective(this.width, this.height, FOV);
        this.panZ(PanZ);
        this.hideCCW = GetValue(config, 'hideCCW', true);

        var girdWidth = GetValue(config, 'gridWidth', 32);
        var girdHeight = GetValue(config, 'girdHeight', girdWidth);
        var textureFrame = this.texture.get(frame);
        var frameWidth = textureFrame.cutWidth,
            frameHeight = textureFrame.cutHeight;
        GenerateGridVerts({
            mesh: this,
            texture: key, frame: frame,

            width: frameWidth / this.height,
            height: frameHeight / this.height,

            widthSegments: Math.ceil(frameWidth / girdWidth),
            heightSegments: Math.ceil(frameHeight / girdHeight)
        });
    }

    get rotationX() {
        return this.modelRotation.x;
    }

    set rotationX(value) {
        this.modelRotation.x = value;
    }

    get angleX() {
        return RadToDeg(this.rotationX);
    }

    set angleX(value) {
        this.rotationX = DegToRad(value);
    }

    get rotationY() {
        return this.modelRotation.y;
    }

    set rotationY(value) {
        this.modelRotation.y = value;
    }

    get angleY() {
        return RadToDeg(this.rotationY);
    }

    set angleY(value) {
        this.rotationY = DegToRad(value);
    }

    get rotationZ() {
        return this.modelRotation.z;
    }

    set rotationZ(value) {
        this.modelRotation.z = value;
    }

    get angleZ() {
        return RadToDeg(this.rotationZ);
    }

    set angleZ(value) {
        this.rotationZ = DegToRad(value);
    }

    transformVerts(x, y, z, rotateX, rotateY, rotateZ) {
        TransformVerts(this, x, y, z, rotateX, rotateY, rotateZ);
        return this;
    }

    forceUpdate() {
        this.dirtyCache[10] = 1;
        return this;
    }
}

export default Image;