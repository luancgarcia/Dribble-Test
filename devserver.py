import os
import sys
import time
import urlparse
import mimetypes
import SocketServer
import SimpleHTTPServer
from threading import Thread
from SocketServer import ThreadingMixIn
from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler


class MyHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    # _special_paths = ["programas", "generos", "buscar", "search", "logado", "perfil"]

    def log_message(self, format, *args):
        sys.stderr.write("%s:%d - - [%s] %s\n" %
                         (self.client_address[0], self.server.server_port, self.log_date_time_string(), format % args))

    def do_GET(self):
        os.chdir(self.server.docroot)
        parsedParams = urlparse.urlparse(self.path)
        paths = [x for x in parsedParams.path.split('/') if x]
        # See if the file requested exists
        if os.access('.' + os.sep + parsedParams.path, os.R_OK):
            # File exists, serve it up
            SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)
        else:
            has_dot = '.' in self.path
            if not has_dot:
                # React Router URLs
                file_path = 'index.html'
            else:
                file_path = os.path.join(paths[0], paths[-1])
            if paths[0] == 'static':
                file_path = '/'.join(paths)
                file_path = os.path.abspath('../' + file_path)  # static folder is up
            if os.path.isfile(file_path):
                self.send_response(200)
                self.send_header('Content-Type', mimetypes.MimeTypes().guess_type(file_path)[0])
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                with open(file_path, 'r') as fin:
                    self.copyfile(fin, self.wfile)
            else:
                self.send_response(404)


class ThreadingHTTPServer(ThreadingMixIn, HTTPServer):
    pass


def serve_on_port(port, path):
    print 'Starting: %s on %d' % (path, port)
    server = ThreadingHTTPServer(("localhost", port), MyHandler)
    server.docroot = path
    server.serve_forever()


def runThread(thread):
    thread.daemon = True
    thread.start()
    return thread


def start_by_arg(arg):
    arg_parts = arg.split('=')
    if len(arg_parts) != 2:
        print 'Invalid argument %s' % arg
        return False
    path = arg_parts[0]
    port = int(arg_parts[1])
    full_path = os.path.join(base, path)
    t = runThread(Thread(target=serve_on_port, args=[port, full_path]))
    return True


if __name__ == '__main__':
    base = os.path.abspath('.')
    sucess_threads = 0
    for arg in sys.argv[1:]:
        sucess_threads += int(start_by_arg(arg))
        time.sleep(1)
    if sucess_threads:
        while True:
            time.sleep(0.1)
    else:
        print 'No running threads. Exiting'
