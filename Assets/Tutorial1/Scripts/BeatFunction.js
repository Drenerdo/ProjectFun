#pragma strict

var freqData:float[] = new float[8192];
var listener : AudioListener;

var band:float[];
var g:GameObject[];

function Start () {
  var n:int = freqData.length;
  var k:int = 0;
  for(var j=0;j<freqData.length;j++)
  {
    n /= 2;
    if(!n)break;
    k++;
  }
  band = new float[k+1];
  g = new GameObject[k+1];
  for(var i=0;i<band.length;i++)
  {
    band[i] = 0;
    g[i] = new GameObject.CreatePrimitive(PrimitiveType.Sphere);
    g[i].transform.position = Vector3(i,0,0);
  }
  InvokeRepeating("check", 0, 1.0/15.0);
}

function check()
{
  listener.GetSpectrumData(freqData, 0, FFTWindow.Rectangular);

  var k:int = 0;
  var crossover:int = 2;
  for(var i:int;i< freqData.length;i++)
  {
    var d = freqData[i];
    var b = band[k];
    band[k] = (d>b)? d:b;
    if(i > crossover - 3)
    {
      k++;
      crossover *= 2;
      g[k].transform.position.y = band[k]*32;
      band[k] = 0;
    }
  }
}

private var sqrt = Mathf().Sqrt;
